/**
 * JXA scripts that send ⌘C/⌘V to other apps. They post keyboard events through CoreGraphics and read the
 * frontmost app from NSWorkspace, which starts in ~50ms. AppleScript with System Events took ~270ms.
 */
const PRELUDE = `
ObjC.import('AppKit');
ObjC.import('CoreGraphics');

const HID_STATE = 1; // kCGEventSourceStateHIDSystemState
const PRIVATE_STATE = -1; // kCGEventSourceStatePrivate
const MODIFIER_MASK = 0x1e0000; // Shift, Control, Option, Command
const MAX_KEY_CODE = 127;
const KEY_C = 8;
const KEY_V = 9;

function frontmostAppId() {
  const app = $.NSWorkspace.sharedWorkspace.frontmostApplication;
  return app.isNil() ? '' : ObjC.unwrap(app.bundleIdentifier) || '';
}

function isAnyKeyDown() {
  if (($.CGEventSourceFlagsState(HID_STATE) & MODIFIER_MASK) !== 0) return true;
  for (let keyCode = 0; keyCode <= MAX_KEY_CODE; keyCode++) {
    if ($.CGEventSourceKeyState(HID_STATE, keyCode)) return true;
  }
  return false;
}

// Waits (up to ~1s) for every key of the hotkey to be released (modifiers and e.g. Space), so ⌘C isn't merged
// with held keys (e.g. ⌘⌥C) or swallowed while the hotkey is still down.
function waitForKeyRelease() {
  for (let i = 0; i < 50 && isAnyKeyDown(); i++) delay(0.02);
}

// A private event source keeps the posted keys independent of the keys the user is physically holding.
function pressWithCommand(keyCode) {
  const source = $.CGEventSourceCreate(PRIVATE_STATE);
  for (const keyDown of [true, false]) {
    const event = $.CGEventCreateKeyboardEvent(source, keyCode, keyDown);
    $.CGEventSetFlags(event, $.kCGEventFlagMaskCommand);
    $.CGEventPost($.kCGHIDEventTap, event);
    if (keyDown) delay(0.01);
  }
}
`

/** Sends ⌘C to the frontmost app and returns its bundle id. */
export const COPY_SELECTION_SCRIPT = `${PRELUDE}
function run() {
  const appId = frontmostAppId();
  waitForKeyRelease();
  pressWithCommand(KEY_C);
  return appId;
}`

/** Takes the source app's bundle id as its argument, brings that app to the front if needed, and sends ⌘V. */
export const PASTE_SCRIPT = `${PRELUDE}
function run(argv) {
  const sourceAppId = argv[0];
  if (sourceAppId && frontmostAppId() !== sourceAppId) {
    Application(sourceAppId).activate();
    delay(0.15);
  }
  waitForKeyRelease();
  pressWithCommand(KEY_V);
}`
