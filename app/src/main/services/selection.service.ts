import { CLIPBOARD_POLL_INTERVAL_MS, CLIPBOARD_RESTORE_DELAY_MS, COPY_TIMEOUT_MS } from '../constants'
import { COPY_SELECTION_SCRIPT, PASTE_SCRIPT } from '../helpers'
import type { CapturedSelection } from '../types'
import { pollUntil, runJxa, sleep } from '../utils'
import { clipboardService } from './clipboard.service'

/**
 * The clipboard restore from the last capture. Captures don't wait for it (writing back a large image can be slow),
 * so the next clipboard use waits for it instead.
 */
let pendingRestore: Promise<void> = Promise.resolve()

/**
 * Reads the selected text in the frontmost app by sending it ⌘C. The user's clipboard is put back
 * in the background, after this resolves.
 */
async function captureSelection(): Promise<CapturedSelection> {
  await pendingRestore
  const original = await clipboardService.snapshot()
  clipboardService.clear()

  try {
    const sourceAppId = (await runJxa(COPY_SELECTION_SCRIPT)) || null
    const text = await pollUntil(async () => (await clipboardService.readText()) || null, {
      timeoutMs: COPY_TIMEOUT_MS,
      intervalMs: CLIPBOARD_POLL_INTERVAL_MS
    })
    return { text: text ?? '', sourceAppId }
  } catch (error) {
    console.error('[selection] Could not read the selection.', error)
    return { text: '', sourceAppId: null }
  } finally {
    pendingRestore = clipboardService.restore(original)
  }
}

/** Pastes `text` into the source app, replacing the selection if there still is one. */
async function pasteText(text: string, sourceAppId: string | null): Promise<void> {
  await pendingRestore
  const original = await clipboardService.snapshot()
  await clipboardService.writeText(text)
  try {
    await runJxa(PASTE_SCRIPT, [sourceAppId ?? ''])
    await sleep(CLIPBOARD_RESTORE_DELAY_MS)
  } finally {
    await clipboardService.restore(original)
  }
}

/** Reads the selected text from, and pastes text into, other apps via synthetic ⌘C/⌘V. */
export const selectionService = { captureSelection, pasteText }
