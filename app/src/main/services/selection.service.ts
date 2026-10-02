import { CLIPBOARD_POLL_INTERVAL_MS, CLIPBOARD_RESTORE_DELAY_MS, COPY_TIMEOUT_MS } from '../constants'
import { buildCopySelectionScript, buildPasteScript } from '../helpers'
import type { CapturedSelection } from '../types'
import { pollUntil, runAppleScript, sleep } from '../utils'
import { clipboardService } from './clipboard.service'

/**
 * Reads the selected text in the frontmost app by sending it ⌘C, then puts the
 * user's clipboard back the way it was.
 */
async function captureSelection(): Promise<CapturedSelection> {
  const original = await clipboardService.snapshot()
  clipboardService.clear()

  try {
    const [sourceAppId = null, status] = (await runAppleScript(buildCopySelectionScript())).split('\n')
    if (status !== 'ok') return { text: '', sourceAppId }

    const text = await pollUntil(async () => (await clipboardService.readText()) || null, {
      timeoutMs: COPY_TIMEOUT_MS,
      intervalMs: CLIPBOARD_POLL_INTERVAL_MS
    })
    return { text: text ?? '', sourceAppId }
  } catch (error) {
    console.error('[selection] Could not read the selection.', error)
    return { text: '', sourceAppId: null }
  } finally {
    await clipboardService.restore(original)
  }
}

/** Pastes `text` into the source app, replacing the selection if there still is one. */
async function pasteText(text: string, sourceAppId: string | null): Promise<void> {
  const original = await clipboardService.snapshot()
  await clipboardService.writeText(text)
  try {
    await runAppleScript(buildPasteScript(sourceAppId))
    await sleep(CLIPBOARD_RESTORE_DELAY_MS)
  } finally {
    await clipboardService.restore(original)
  }
}

/** Reads the selected text from, and pastes text into, other apps via synthetic ⌘C/⌘V. */
export const selectionService = { captureSelection, pasteText }
