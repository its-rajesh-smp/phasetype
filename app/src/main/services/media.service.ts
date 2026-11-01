import { MEDIA_INFO_TIMEOUT_MS, MEDIA_PREPARE_TIMEOUT_MS } from '../constants'
import type { MediaInfo, PreparedMedia } from '../types'
import { nativeHelperPath, runFile } from '../utils'

/** The helper built from native/media-helper. */
const HELPER_PATH = nativeHelperPath('phasetype-media')

type HelperOutput<T> = ({ ok: true } & T) | { ok: false; reason?: string }

/** Runs the helper and returns its output. Throws its reason (or an AbortError) if it fails. */
async function runHelper<T>(args: string[], options: { timeoutMs: number; signal?: AbortSignal }): Promise<T> {
  const output = JSON.parse(await runFile(HELPER_PATH, args, options)) as HelperOutput<T>
  if (!output.ok) throw new Error(output.reason || 'The file couldn’t be read.')
  return output
}

/** Reads an audio or video file's length and which tracks it has. Throws if macOS can't read it. */
async function inspect(path: string): Promise<MediaInfo> {
  const { duration, hasAudio, hasVideo } = await runHelper<{ duration: number; hasAudio: boolean; hasVideo: boolean }>(
    ['info', path],
    { timeoutMs: MEDIA_INFO_TIMEOUT_MS }
  )
  return { durationSeconds: duration, hasAudio, hasVideo }
}

interface PrepareOptions {
  /** Where the clips and frames are written. The caller deletes it. */
  outputDir: string
  frameCount: number
  chunkSeconds: number
  signal: AbortSignal
}

/** Writes the file's sound as compact audio clips and its picture as evenly spaced frames. Throws if it can't. */
async function prepare(path: string, { outputDir, frameCount, chunkSeconds, signal }: PrepareOptions): Promise<PreparedMedia> {
  const { audio, frames } = await runHelper<{ audio: string[]; frames: { path: string; seconds: number }[] }>(
    ['prepare', path, outputDir, String(frameCount), String(chunkSeconds)],
    { timeoutMs: MEDIA_PREPARE_TIMEOUT_MS, signal }
  )
  return { audioPaths: audio, frames }
}

/** Reads audio and video files through the native media helper (AVFoundation). */
export const mediaService = { inspect, prepare }
