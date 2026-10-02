import { clipboard, ClipboardItem } from 'electron'
import type { ClipboardSnapshot } from '../types'

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

/** Wraps the system clipboard, including full snapshot/restore so the user's clipboard is preserved. */
export const clipboardService = {
  snapshot,
  restore,
  clear: (): void => clipboard.clear(),
  readText: (): Promise<string> => clipboard.readText(),
  writeText: (text: string): Promise<void> => clipboard.writeText(text)
}
