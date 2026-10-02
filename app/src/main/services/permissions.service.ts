import { shell, systemPreferences } from 'electron'
import { ACCESSIBILITY_SETTINGS_URL } from '../constants'

/** True if macOS has granted this app Accessibility access. Does not prompt. */
const isAccessibilityGranted = (): boolean => systemPreferences.isTrustedAccessibilityClient(false)

/** Shows the macOS prompt (first time only) and opens the Accessibility pane in System Settings. */
async function requestAccessibility(): Promise<boolean> {
  if (systemPreferences.isTrustedAccessibilityClient(true)) return true
  await shell.openExternal(ACCESSIBILITY_SETTINGS_URL)
  return false
}

/** Checks and requests the macOS Accessibility permission needed to copy and paste. */
export const permissionsService = { isAccessibilityGranted, requestAccessibility }
