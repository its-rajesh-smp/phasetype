/** How a file is sent to the model: as an image, a PDF, or as extracted text. */
export type AttachmentKind = 'image' | 'pdf' | 'document' | 'text'

/** A file captured from the frontmost app (e.g. selected in Finder), as shown in the panel. */
export interface AttachmentSummary {
  id: string
  name: string
  /** Upper-case extension without the dot, e.g. "PNG". Empty if the file has none. */
  extension: string
  sizeBytes: number
  kind: AttachmentKind | null
  /** Quick Look thumbnail as a data URL, if one could be made. */
  thumbnail: string | null
  /** Why the file can't be sent (unsupported type, too large, a folder). Null if it can. */
  error: string | null
}
