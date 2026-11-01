// Reads audio and video files with AVFoundation, so PhaseType can send them to the AI: the sound as compact audio
// clips to transcribe, the picture as still frames. Runs as a child process of PhaseType.
//
//   phasetype-media info <file>
//     Prints {"ok":true,"duration":…,"hasAudio":…,"hasVideo":…}.
//   phasetype-media prepare <file> <outputDir> <frameCount> <chunkSeconds>
//     Writes the sound as mono AAC clips of at most <chunkSeconds> each and <frameCount> evenly spaced JPEG frames
//     into <outputDir>. Prints {"ok":true,"duration":…,"audio":["…"],"frames":[{"path":"…","seconds":…}]}.
//
// Prints {"ok":false,"reason":"…"} when it can't.

import AVFoundation
import Foundation
import ImageIO

struct Frame: Encodable {
  let path: String
  let seconds: Double
}

struct Output: Encodable {
  let ok: Bool
  var duration: Double? = nil
  var hasAudio: Bool? = nil
  var hasVideo: Bool? = nil
  var audio: [String]? = nil
  var frames: [Frame]? = nil
  var reason: String? = nil
}

struct HelperError: Error {
  let reason: String
}

func emit(_ output: Output) -> Never {
  FileHandle.standardOutput.write((try? JSONEncoder().encode(output)) ?? Data())
  exit(0)
}

func fail(_ reason: String) -> Never {
  emit(Output(ok: false, reason: reason))
}

enum Limits {
  /** Frames are scaled to fit this box: enough to read on-screen text, small enough to keep image tokens cheap. */
  static let maxFrameSize = CGSize(width: 768, height: 768)
  static let jpegQuality = 0.8
}

/** Speech needs little: 16 kHz mono AAC at 32 kbps keeps an hour of sound around 14 MB. */
func compactAudioSettings() -> [String: Any] {
  [AVFormatIDKey: kAudioFormatMPEG4AAC, AVSampleRateKey: 16_000, AVNumberOfChannelsKey: 1, AVEncoderBitRateKey: 32_000]
}

/**
 * Copies sample buffers from a reader output to a writer input on AVFoundation's callback queue.
 * Only that queue touches the two objects, so handing them over is safe.
 */
final class AudioPump: @unchecked Sendable {
  let output: AVAssetReaderOutput
  let input: AVAssetWriterInput
  let queue = DispatchQueue(label: "phasetype-media.audio")

  init(output: AVAssetReaderOutput, input: AVAssetWriterInput) {
    self.output = output
    self.input = input
  }

  /** Returns how many buffers were written, once the reader runs out or the writer stops. */
  func run() async -> Int {
    await withCheckedContinuation { (continuation: CheckedContinuation<Int, Never>) in
      var written = 0
      input.requestMediaDataWhenReady(on: queue) { [self] in
        while input.isReadyForMoreMediaData {
          guard let buffer = output.copyNextSampleBuffer(), input.append(buffer) else {
            input.markAsFinished()
            continuation.resume(returning: written)
            return
          }
          written += 1
        }
      }
    }
  }
}

struct LoadedAsset {
  let asset: AVURLAsset
  let duration: Double
  /** Where the sound ends, which can be before the end of the video. */
  let audioEnd: Double
  let audioTracks: [AVAssetTrack]
  let videoTracks: [AVAssetTrack]
}

func load(_ path: String) async throws -> LoadedAsset {
  let asset = AVURLAsset(url: URL(fileURLWithPath: path))
  let (duration, readable, tracks) = try await asset.load(.duration, .isReadable, .tracks)
  guard readable else { throw HelperError(reason: "The file can't be read (it may be protected or damaged).") }
  let audioTracks = tracks.filter { $0.mediaType == .audio }
  var audioEnd = 0.0
  for track in audioTracks {
    let end = try await track.load(.timeRange).end.seconds
    if end.isFinite { audioEnd = max(audioEnd, end) }
  }
  return LoadedAsset(
    asset: asset,
    duration: duration.seconds.isFinite ? duration.seconds : 0,
    audioEnd: audioEnd,
    audioTracks: audioTracks,
    videoTracks: tracks.filter { $0.mediaType == .video }
  )
}

/** Mixes every audio track in `range` down to one compact AAC file at `url`. Returns false, writing nothing, if the range has no sound. */
func exportAudio(_ loaded: LoadedAsset, range: CMTimeRange, to url: URL) async throws -> Bool {
  let reader = try AVAssetReader(asset: loaded.asset)
  reader.timeRange = range
  let output = AVAssetReaderAudioMixOutput(audioTracks: loaded.audioTracks, audioSettings: [AVFormatIDKey: kAudioFormatLinearPCM])
  guard reader.canAdd(output) else { throw HelperError(reason: "The audio can't be read.") }
  reader.add(output)

  let writer = try AVAssetWriter(outputURL: url, fileType: .m4a)
  let input = AVAssetWriterInput(mediaType: .audio, outputSettings: compactAudioSettings())
  input.expectsMediaDataInRealTime = false
  guard writer.canAdd(input) else { throw HelperError(reason: "The audio can't be converted.") }
  writer.add(input)

  guard reader.startReading() else { throw reader.error ?? HelperError(reason: "The audio can't be read.") }
  guard writer.startWriting() else { throw writer.error ?? HelperError(reason: "The audio can't be converted.") }
  writer.startSession(atSourceTime: range.start)

  let written = await AudioPump(output: output, input: input).run()

  if reader.status == .failed { throw reader.error ?? HelperError(reason: "The audio can't be read.") }
  if written == 0 {
    writer.cancelWriting()
    try? FileManager.default.removeItem(at: url)
    return false
  }
  await writer.finishWriting()
  if writer.status != .completed { throw writer.error ?? HelperError(reason: "The audio can't be converted.") }
  return true
}

/** Writes the sound as clips of at most `chunkSeconds`, so each stays under the transcription service's length limit. */
func exportAudioChunks(_ loaded: LoadedAsset, into directory: URL, chunkSeconds: Double) async throws -> [String] {
  let count = max(1, Int((loaded.audioEnd / chunkSeconds).rounded(.up)))
  var paths: [String] = []
  for index in 0..<count {
    let start = Double(index) * chunkSeconds
    let length = min(chunkSeconds, loaded.audioEnd - start)
    let range = CMTimeRange(
      start: CMTime(seconds: start, preferredTimescale: 600),
      duration: CMTime(seconds: length, preferredTimescale: 600)
    )
    let url = directory.appendingPathComponent("audio-\(index).m4a")
    if try await exportAudio(loaded, range: range, to: url) { paths.append(url.path) }
  }
  return paths
}

func writeJpeg(_ image: CGImage, to url: URL) -> Bool {
  guard let destination = CGImageDestinationCreateWithURL(url as CFURL, "public.jpeg" as CFString, 1, nil) else { return false }
  CGImageDestinationAddImage(destination, image, [kCGImageDestinationLossyCompressionQuality: Limits.jpegQuality] as CFDictionary)
  return CGImageDestinationFinalize(destination)
}

/** Grabs `count` frames from the middle of equal slices of the video. Frames that can't be decoded are skipped. */
func exportFrames(_ loaded: LoadedAsset, into directory: URL, count: Int) -> [Frame] {
  let generator = AVAssetImageGenerator(asset: loaded.asset)
  generator.appliesPreferredTrackTransform = true
  generator.maximumSize = Limits.maxFrameSize
  // Snapping to a nearby keyframe is much faster and makes no difference for a summary.
  let tolerance = CMTime(seconds: min(1, loaded.duration / Double(count * 4)), preferredTimescale: 600)
  generator.requestedTimeToleranceBefore = tolerance
  generator.requestedTimeToleranceAfter = tolerance

  return (0..<count).compactMap { index in
    let seconds = loaded.duration * (Double(index) + 0.5) / Double(count)
    var actual = CMTime.zero
    guard let image = try? generator.copyCGImage(at: CMTime(seconds: seconds, preferredTimescale: 600), actualTime: &actual) else {
      return nil
    }
    let url = directory.appendingPathComponent("frame-\(index).jpg")
    guard writeJpeg(image, to: url) else { return nil }
    return Frame(path: url.path, seconds: actual.seconds.isFinite ? actual.seconds : seconds)
  }
}

func info(_ path: String) async -> Never {
  do {
    let loaded = try await load(path)
    emit(Output(ok: true, duration: loaded.duration, hasAudio: !loaded.audioTracks.isEmpty, hasVideo: !loaded.videoTracks.isEmpty))
  } catch let error as HelperError {
    fail(error.reason)
  } catch {
    fail(error.localizedDescription)
  }
}

func prepare(_ path: String, outputDir: String, frameCount: Int, chunkSeconds: Double) async -> Never {
  do {
    let loaded = try await load(path)
    let directory = URL(fileURLWithPath: outputDir, isDirectory: true)
    let audio = loaded.audioTracks.isEmpty ? [] : try await exportAudioChunks(loaded, into: directory, chunkSeconds: chunkSeconds)
    let frames = loaded.videoTracks.isEmpty || frameCount == 0 ? [] : exportFrames(loaded, into: directory, count: frameCount)
    if audio.isEmpty && frames.isEmpty { fail("No sound or picture could be read from the file.") }
    emit(Output(ok: true, duration: loaded.duration, audio: audio, frames: frames))
  } catch let error as HelperError {
    fail(error.reason)
  } catch {
    fail(error.localizedDescription)
  }
}

let args = CommandLine.arguments

switch args.count > 1 ? args[1] : "" {
case "info" where args.count > 2:
  await info(args[2])
case "prepare" where args.count > 5:
  guard let frameCount = Int(args[4]), let chunkSeconds = Double(args[5]), chunkSeconds > 0 else {
    fail("Usage: phasetype-media prepare <file> <outputDir> <frameCount> <chunkSeconds>")
  }
  await prepare(args[2], outputDir: args[3], frameCount: frameCount, chunkSeconds: chunkSeconds)
default:
  fail("Usage: phasetype-media info <file> | prepare <file> <outputDir> <frameCount> <chunkSeconds>")
}
