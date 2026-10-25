import { CLIPBOARD_POLL_INTERVAL_MS, CLIPBOARD_RESTORE_DELAY_MS, COPY_RETRY_TIMEOUT_MS, COPY_TIMEOUT_MS } from '../constants'
import { COPY_SELECTION_SCRIPT, PASTE_SCRIPT } from '../helpers'
import type { CapturedSelection } from '../types'
import { pollUntil, runJxa, sleep } from '../utils'
import { accessibilityService } from './accessibility.service'
import { clipboardService } from './clipboard.service'

/**
 * The clipboard restore from the last capture. Captures don't wait for it (writing back a large image can be slow),
 * so the next clipboard use waits for it instead.
 */
let pendingRestore: Promise<void> = Promise.resolve()

type CopiedContent = Omit<CapturedSelection, 'sourceAppId'>

/** Reads what a ⌘C put on the clipboard. Files win over text, since Finder also copies the file names as text. */
async function readCopied(): Promise<CopiedContent | null> {
  const files = await clipboardService.readFilePaths()
  if (files.length) return { text: '', files }
  const text = await clipboardService.readText()
  return text ? { text, files: [] } : null
}

/** Waits for copied text or files to show up on the (cleared) clipboard; null if nothing arrives in time. */
const waitForCopied = (timeoutMs: number): Promise<CopiedContent | null> =>
  pollUntil(readCopied, { timeoutMs, intervalMs: CLIPBOARD_POLL_INTERVAL_MS })

/**
 * Reads the selected text (or files, e.g. in Finder) in the frontmost app: directly through Accessibility when the app supports it, otherwise
 * by sending it ⌘C. After a ⌘C, the user's clipboard is put back in the background, after this resolves.
 */
async function captureSelection(): Promise<CapturedSelection> {
  const direct = await accessibilityService.readSelection()
  if (direct) return direct

  await pendingRestore
  const original = await clipboardService.snapshot()
  clipboardService.clear()

  try {
    const sourceAppId = (await runJxa(COPY_SELECTION_SCRIPT)) || null
    let copied = await waitForCopied(COPY_TIMEOUT_MS)
    if (copied === null) {
      // Apps sometimes drop a synthetic ⌘C (busy, or still handling the hotkey). Copying again is harmless.
      await runJxa(COPY_SELECTION_SCRIPT)
      copied = await waitForCopied(COPY_RETRY_TIMEOUT_MS)
    }
    return { text: copied?.text ?? '', files: copied?.files ?? [], sourceAppId }
  } catch (error) {
    console.error('[selection] Could not read the selection.', error)
    return { text: '', files: [], sourceAppId: null }
  } finally {
    pendingRestore = clipboardService.restore(original)
  }
}

/**
 * Puts `text` into the source app, replacing the selection if there still is one: directly through Accessibility when
 * the app supports it, otherwise by pasting with ⌘V.
 */
async function pasteText(text: string, sourceAppId: string | null): Promise<void> {
  if (sourceAppId && (await accessibilityService.replaceSelection(text, sourceAppId))) return

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

/** Reads the selected text from, and puts text into, other apps via Accessibility or synthetic ⌘C/⌘V. */
export const selectionService = { captureSelection, pasteText }
