/**
 * JXA scripts that send ⌘C/⌘V to other apps. They post keyboard events through CoreGraphics and read the
 * frontmost app from NSWorkspace, which starts in ~50ms. AppleScript with System Events took ~270ms.
 */
const PRELUDE = `
ObjC.import('AppKit');
ObjC.import('CoreGraphics');

const HID_STATE = 1; // kCGEventSourceStateHIDSystemState
const MODIFIER_MASK = 0x1e0000; // Shift, Control, Option, Command
const KEY_C = 8;
const KEY_V = 9;

function frontmostAppId() {
  const app = $.NSWorkspace.sharedWorkspace.frontmostApplication;
  return app.isNil() ? '' : ObjC.unwrap(app.bundleIdentifier) || '';
}

// Waits (up to ~1s) for the hotkey's modifiers to be released, so ⌘C isn't merged with held keys (e.g. ⌘⌥C).
function waitForModifierRelease() {
  for (let i = 0; i < 50 && ($.CGEventSourceFlagsState(HID_STATE) & MODIFIER_MASK) !== 0; i++) delay(0.02);
}

function pressWithCommand(keyCode) {
  for (const keyDown of [true, false]) {
    const event = $.CGEventCreateKeyboardEvent($(), keyCode, keyDown);
    $.CGEventSetFlags(event, $.kCGEventFlagMaskCommand);
    $.CGEventPost($.kCGHIDEventTap, event);
  }
}
`

/** Sends ⌘C to the frontmost app and returns its bundle id. */
export const COPY_SELECTION_SCRIPT = `${PRELUDE}
function run() {
  const appId = frontmostAppId();
  waitForModifierRelease();
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
  waitForModifierRelease();
  pressWithCommand(KEY_V);
}`
