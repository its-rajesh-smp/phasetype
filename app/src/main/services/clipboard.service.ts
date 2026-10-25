import { clipboard, ClipboardItem } from 'electron'
import { fileURLToPath } from 'url'
import type { ClipboardSnapshot } from '../types'

const URI_LIST_TYPE = 'text/uri-list'

/**
 * Captures every item and format on the clipboard so it can be restored later.
 * Unreadable formats are skipped; returns an empty list on failure.
 */
async function snapshot(): Promise<ClipboardSnapshot> {
  try {
    const items = await clipboard.read()
    return await Promise.all(
      items.map(async (item) => {
        const entries = await Promise.all(
          item.types.map(async (type) => {
            try {
              return [type, await item.getType(type)] as const
            } catch {
              // Some private formats can't be read back; skip them rather than lose the rest.
              return null
            }
          })
        )
        return Object.fromEntries(entries.filter((entry) => entry !== null))
      })
    )
  } catch (error) {
    console.error('[clipboard] Could not snapshot the clipboard.', error)
    return []
  }
}

/** Puts a snapshot back on the clipboard, or clears it if the snapshot was empty. Logs errors instead of throwing. */
async function restore(items: ClipboardSnapshot): Promise<void> {
  const nonEmpty = items.filter((item) => Object.keys(item).length > 0)
  if (nonEmpty.length === 0) {
    clipboard.clear()
    return
  }
  try {
    await clipboard.write(nonEmpty.map((item) => new ClipboardItem(item)))
  } catch (error) {
    console.error('[clipboard] Could not restore the clipboard.', error)
  }
}

/** Paths of the files on the clipboard (e.g. after ⌘C in Finder), from its `text/uri-list`. Empty if there are none. */
async function readFilePaths(): Promise<string[]> {
  try {
    if (!(await clipboard.has(URI_LIST_TYPE))) return []
    const item = (await clipboard.read()).find((entry) => entry.types.includes(URI_LIST_TYPE))
    if (!item) return []
    const value = await item.getType(URI_LIST_TYPE)
    const list = typeof value === 'string' ? value : await (value as Blob).text()
    return list
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.startsWith('file://'))
      .map((url) => fileURLToPath(url))
  } catch (error) {
    console.error('[clipboard] Could not read copied files.', error)
    return []
  }
}

/** Wraps the system clipboard, including full snapshot/restore so the user's clipboard is preserved. */
export const clipboardService = {
  snapshot,
  restore,
  clear: (): void => clipboard.clear(),
  readText: (): Promise<string> => clipboard.readText(),
  readFilePaths,
  writeText: (text: string): Promise<void> => clipboard.writeText(text)
}
