import type { Result } from '@shared/types'
import { listEnabledPresets } from '@shared/utils'
import { attachmentService, permissionsService, selectionService, settingsStore } from '../services'
import { toErrorMessage } from '../utils'
import { hidePanel, isPanelFocused, isPanelVisible, showPanel } from '../windows'
import { isQuickFixRunning } from './quickFix.controller'

let sourceAppId: string | null = null
let capturing = false

/**
 * Hotkey pressed: opens the panel straight away, reads the selection (text, or files e.g. in Finder) in the frontmost app,
 * then focuses the panel.
 * Pressing it again while the panel is focused closes it; pressing it in another app while the panel is open
 * reads that app's selection into the panel instead.
 */
export async function handleHotkey(): Promise<void> {
  if (isPanelFocused()) {
    hidePanel()
    return
  }
  // A running quick fix is using the clipboard; reading the selection now would clash with it.
  if (capturing || isQuickFixRunning()) return
  capturing = true

  try {
    const accessibilityGranted = permissionsService.isAccessibilityGranted()
    const presets = listEnabledPresets(settingsStore.getSettings().presets)
    attachmentService.clear()
    if (!accessibilityGranted) {
      sourceAppId = null
      showPanel({ selectedText: '', attachments: [], accessibilityGranted, capturing: false, presets })
      return
    }

    // Show it unfocused first, so the ⌘C sent while reading the selection still reaches the other app.
    showPanel({ selectedText: '', attachments: [], accessibilityGranted, capturing: true, presets }, { focus: false })
    const selection = await selectionService.captureSelection()
    sourceAppId = selection.sourceAppId
    const attachments = await attachmentService.capture(selection.files)
    // The hotkey was pressed again while reading the selection, closing the panel.
    if (!isPanelVisible()) return
    showPanel({ selectedText: selection.text, attachments, accessibilityGranted, capturing: false, presets })
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
