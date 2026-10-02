export interface CapturedSelection {
  text: string
  /** Bundle id of the app that was frontmost when the hotkey was pressed. */
  sourceAppId: string | null
}

/** Every entry on the clipboard, keyed by MIME type, so it can be written back unchanged. */
export type ClipboardSnapshot = Record<string, Blob | Electron.ClipboardBookmark>[]
