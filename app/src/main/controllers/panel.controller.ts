import type { Result } from '@shared/types'
import { listEnabledPresets } from '@shared/utils'
import { permissionsService, selectionService, settingsStore } from '../services'
import { toErrorMessage } from '../utils'
import { hidePanel, isPanelVisible, showPanel } from '../windows'
import { isQuickFixRunning } from './quickFix.controller'

let sourceAppId: string | null = null
let capturing = false

/**
 * Hotkey pressed: opens the panel straight away, reads the selection in the frontmost app, then focuses the panel.
 * Pressing it again closes the panel.
 */
export async function handleHotkey(): Promise<void> {
  if (isPanelVisible()) {
    hidePanel()
    return
  }
  // A running quick fix is using the clipboard; reading the selection now would clash with it.
  if (capturing || isQuickFixRunning()) return
  capturing = true

  try {
    const accessibilityGranted = permissionsService.isAccessibilityGranted()
    const presets = listEnabledPresets(settingsStore.getSettings().presets)
    if (!accessibilityGranted) {
      sourceAppId = null
      showPanel({ selectedText: '', accessibilityGranted, capturing: false, presets })
      return
    }

    // Show it unfocused first, so the ⌘C sent while reading the selection still reaches the other app.
    showPanel({ selectedText: '', accessibilityGranted, capturing: true, presets }, { focus: false })
    const selection = await selectionService.captureSelection()
    sourceAppId = selection.sourceAppId
    // The hotkey was pressed again while reading the selection, closing the panel.
    if (!isPanelVisible()) return
    showPanel({ selectedText: selection.text, accessibilityGranted, capturing: false, presets })
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
