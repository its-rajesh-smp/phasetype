import type { AttachmentSummary } from '@shared/types'

/** A captured file and what the panel shows for it. */
export interface StoredAttachment {
  path: string
  summary: AttachmentSummary
}

/** A frame taken from a video, as a JPEG data URL. */
export interface VideoFrame {
  seconds: number
  dataUrl: string
}

/** A file's contents, ready to put in a chat message. */
export type LoadedAttachment =
  | { kind: 'image'; name: string; dataUrl: string }
  | { kind: 'pdf'; name: string; dataUrl: string }
  | { kind: 'text'; name: string; text: string }
  /** Audio or video: what was said (null if the file has no sound) and, for video, frames in order. */
  | { kind: 'media'; name: string; durationSeconds: number; transcript: string | null; frames: VideoFrame[] }

/** An audio or video file's length and tracks. */
export interface MediaInfo {
  durationSeconds: number
  hasAudio: boolean
  hasVideo: boolean
}

/** Audio clips and frames written for one recording by the media helper. */
export interface PreparedMedia {
  audioPaths: string[]
  frames: { path: string; seconds: number }[]
}

/** A short audio file to transcribe. */
export interface AudioClip {
  filename: string
  data: Buffer
}

export interface LoadAttachmentsOptions {
  /** Turns an audio clip into text. Called at most once per clip per panel session; the result is reused. */
  transcribe: (clip: AudioClip) => Promise<string>
  /** Reports slow steps, e.g. "Transcribing call.mp4…". */
  onStatus: (message: string) => void
  signal: AbortSignal
}
