/** How a file is sent to the model: as an image, a PDF, as extracted text, or (audio and video) as a transcript and frames. */
export type AttachmentKind = 'image' | 'pdf' | 'document' | 'text' | 'audio' | 'video'

/** A file captured from the frontmost app (e.g. selected in Finder), as shown in the panel. */
export interface AttachmentSummary {
  id: string
  name: string
  /** Upper-case extension without the dot, e.g. "PNG". Empty if the file has none. */
  extension: string
  sizeBytes: number
  /** Length of audio and video files. Null for other files. */
  durationSeconds: number | null
  kind: AttachmentKind | null
  /** Quick Look thumbnail as a data URL, if one could be made. */
  thumbnail: string | null
  /** Why the file can't be sent (unsupported type, too large, a folder). Null if it can. */
  error: string | null
}
