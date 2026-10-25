import type { AttachmentSummary } from '@shared/types'

/** A captured file and what the panel shows for it. */
export interface StoredAttachment {
  path: string
  summary: AttachmentSummary
}

/** A file's contents, ready to put in a chat message. */
export type LoadedAttachment =
  | { kind: 'image'; name: string; dataUrl: string }
  | { kind: 'pdf'; name: string; dataUrl: string }
  | { kind: 'text'; name: string; text: string }
