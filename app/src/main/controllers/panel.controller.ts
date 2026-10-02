import type { Result } from '@shared/types'
import { permissionsService, selectionService } from '../services'
import { toErrorMessage } from '../utils'
import { hidePanel, isPanelVisible, showPanel } from '../windows'

let sourceAppId: string | null = null
let capturing = false

/** Hotkey pressed: read the selection in the frontmost app, then open the panel. Pressing it again closes the panel. */
export async function handleHotkey(): Promise<void> {
  if (isPanelVisible()) {
    hidePanel()
    return
  }
  if (capturing) return
  capturing = true

  try {
    const accessibilityGranted = permissionsService.isAccessibilityGranted()
    const selection = accessibilityGranted
      ? await selectionService.captureSelection()
      : { text: '', sourceAppId: null }
    sourceAppId = selection.sourceAppId
    showPanel({ selectedText: selection.text, accessibilityGranted })
  } finally {
    capturing = false
  }
}

/**
 * Hides the panel and pastes `text` into the app the selection came from.
 * Returns an error result if Accessibility access is missing or the paste fails.
 */
export async function pasteIntoSourceApp(text: string): Promise<Result> {
  if (!permissionsService.isAccessibilityGranted()) {
    return { ok: false, error: 'PhaseType needs Accessibility access to paste. Use Copy instead, or grant access in Settings.' }
  }
  hidePanel({ restoreFocus: false })
  try {
    await selectionService.pasteText(text, sourceAppId)
    return { ok: true, data: undefined }
  } catch (error) {
    return { ok: false, error: toErrorMessage(error) }
  }
}
