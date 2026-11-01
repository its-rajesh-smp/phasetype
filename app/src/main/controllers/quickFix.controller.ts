import { QUICK_FIX_ACTION } from '@shared/constants'
import { aiService, permissionsService, selectionService } from '../services'
import { isAbortError, toErrorMessage } from '../utils'
import { hideStatus, isPanelFocused, showStatus } from '../windows'

let controller: AbortController | null = null

/** True while a quick fix is reading, fixing or pasting the selection. */
export const isQuickFixRunning = (): boolean => controller !== null

/** Puts the original text's leading and trailing whitespace around the fixed text, which models tend to drop. */
function keepSurroundingWhitespace(original: string, fixed: string): string {
  const leading = original.match(/^\s*/)?.[0] ?? ''
  const trailing = original.match(/\s*$/)?.[0] ?? ''
  return `${leading}${fixed.trim()}${trailing}`
}

/**
 * Quick fix hotkey pressed: fixes the selected text and pastes it back in place, without opening the panel.
 * Progress shows in the status pill. Pressing the hotkey again while it runs cancels it.
 */
export async function handleQuickFixHotkey(): Promise<void> {
  if (controller) {
    controller.abort()
    return
  }
  if (isPanelFocused()) return

  if (!permissionsService.isAccessibilityGranted()) {
    showStatus({ state: 'error', message: 'PhaseType needs Accessibility access. Grant it in Settings.' })
    return
  }

  const current = new AbortController()
  controller = current
  showStatus({ state: 'working' })

  try {
    const selection = await selectionService.captureSelection()
    current.signal.throwIfAborted()
    if (!selection.text.trim()) {
      showStatus({ state: 'error', message: 'Select some text first.' })
      return
    }

    const output = await aiService.complete(
      { instruction: QUICK_FIX_ACTION.instruction, label: QUICK_FIX_ACTION.label, text: selection.text, source: 'quickFix' },
      current.signal
    )
    current.signal.throwIfAborted()
    if (!output.trim()) {
      showStatus({ state: 'error', message: 'The AI returned an empty result. Try again.' })
      return
    }

    await selectionService.pasteText(keepSurroundingWhitespace(selection.text, output), selection.sourceAppId)
    showStatus({ state: 'done' })
  } catch (error) {
    if (isAbortError(error)) hideStatus()
    else showStatus({ state: 'error', message: toErrorMessage(error) })
  } finally {
    controller = null
  }
}
