/**
 * Waits (up to ~1s) for the hotkey's modifiers to be released so the synthetic ⌘C/⌘V isn't merged
 * with held keys (e.g. ⌘⌥C). Checks bits 17–20 of NSEvent.modifierFlags (Shift, Control, Option, Command).
 */
const WAIT_FOR_MODIFIER_RELEASE = `
set attempts to 0
repeat while ((current application's NSEvent's modifierFlags()) as integer) div 131072 mod 16 > 0 and attempts < 50
  delay 0.02
  set attempts to attempts + 1
end repeat`

const SCRIPT_HEADER = `use framework "AppKit"
use scripting additions`

/** Returns "<frontmost bundle id>\n<ok|failed>" after sending ⌘C to the frontmost app. */
export const buildCopySelectionScript = (): string => `${SCRIPT_HEADER}
tell application "System Events" to set frontApp to bundle identifier of first application process whose frontmost is true
${WAIT_FOR_MODIFIER_RELEASE}
set copyStatus to "ok"
try
  tell application "System Events" to keystroke "c" using command down
on error
  set copyStatus to "failed"
end try
return frontApp & linefeed & copyStatus`

const SAFE_BUNDLE_ID = /^[\w.-]+$/

/** Brings the source app back to the front and sends ⌘V. */
export const buildPasteScript = (sourceAppId: string | null): string => {
  const activate =
    sourceAppId && SAFE_BUNDLE_ID.test(sourceAppId)
      ? `tell application id "${sourceAppId}" to activate
delay 0.15`
      : ''
  return `${SCRIPT_HEADER}
${activate}
${WAIT_FOR_MODIFIER_RELEASE}
tell application "System Events" to keystroke "v" using command down`
}
