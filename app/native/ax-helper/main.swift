// Reads and replaces the selected text in other apps through the macOS Accessibility API, so PhaseType doesn't need
// to go through the clipboard. Runs as a child process of PhaseType, so it uses PhaseType's Accessibility permission.
//
//   phasetype-ax read             Prints {"ok":true,"text":"…","appId":"…"} for the frontmost app's selection.
//   phasetype-ax replace <appId>  Replaces that app's selection with the text on stdin. Prints {"ok":true}.
//
// Prints {"ok":false,"reason":"…"} when it can't, and PhaseType falls back to copy/paste.

import AppKit
import ApplicationServices

struct Output: Encodable {
  let ok: Bool
  var text: String? = nil
  var appId: String? = nil
  var reason: String? = nil
}

func emit(_ output: Output) -> Never {
  FileHandle.standardOutput.write((try? JSONEncoder().encode(output)) ?? Data())
  exit(0)
}

func fail(_ reason: String, appId: String? = nil) -> Never {
  emit(Output(ok: false, appId: appId, reason: reason))
}

/** Seconds to wait for an app to answer an Accessibility request, so a hung app can't stall the helper. */
let messagingTimeout: Float = 0.3
/** Levels of parent elements to check when looking for web content. */
let maxParentDepth = 30

func attribute(_ element: AXUIElement, _ name: String) -> CFTypeRef? {
  var value: CFTypeRef?
  return AXUIElementCopyAttributeValue(element, name as CFString, &value) == .success ? value : nil
}

func stringAttribute(_ element: AXUIElement, _ name: String) -> String? {
  attribute(element, name) as? String
}

func elementAttribute(_ element: AXUIElement, _ name: String) -> AXUIElement? {
  guard let value = attribute(element, name), CFGetTypeID(value) == AXUIElementGetTypeID() else { return nil }
  return (value as! AXUIElement)
}

/**
 * Returns the focused text element in the app with `pid`. Chromium and Electron apps (Chrome, Slack, VS Code) only
 * build their accessibility tree once asked to, so this asks and retries briefly the first time.
 */
func focusedElement(pid: pid_t) -> AXUIElement? {
  let app = AXUIElementCreateApplication(pid)
  AXUIElementSetMessagingTimeout(app, messagingTimeout)
  AXUIElementSetAttributeValue(app, "AXManualAccessibility" as CFString, kCFBooleanTrue)

  for attempt in 0..<4 {
    if let element = elementAttribute(app, kAXFocusedUIElementAttribute) {
      AXUIElementSetMessagingTimeout(element, messagingTimeout)
      return element
    }
    if attempt < 3 { usleep(50_000) }
  }
  return nil
}

func isSecure(_ element: AXUIElement) -> Bool {
  stringAttribute(element, kAXSubroleAttribute) == kAXSecureTextFieldSubrole
}

/** True if the element is inside a web page (browsers and Electron apps). */
func isInWebContent(_ element: AXUIElement) -> Bool {
  var current: AXUIElement? = element
  for _ in 0..<maxParentDepth {
    guard let node = current else { return false }
    if stringAttribute(node, kAXRoleAttribute) == "AXWebArea" { return true }
    current = elementAttribute(node, kAXParentAttribute)
  }
  return false
}

func read() -> Never {
  guard let app = NSWorkspace.shared.frontmostApplication else { fail("No frontmost app.") }
  let appId = app.bundleIdentifier
  guard let element = focusedElement(pid: app.processIdentifier) else { fail("No focused element.", appId: appId) }
  if isSecure(element) { fail("Secure text field.", appId: appId) }
  // An empty selection may just mean the app doesn't report it, so let PhaseType try copying instead.
  guard let text = stringAttribute(element, kAXSelectedTextAttribute), !text.isEmpty else {
    fail("No selected text reported.", appId: appId)
  }
  emit(Output(ok: true, text: text, appId: appId))
}

func replace(appId: String, text: String) -> Never {
  guard let app = NSRunningApplication.runningApplications(withBundleIdentifier: appId).first else {
    fail("App is not running.")
  }
  // Pasting brings the app to the front first; leave that case to it.
  guard app.isActive else { fail("App is not frontmost.") }
  guard let element = focusedElement(pid: app.processIdentifier) else { fail("No focused element.") }
  if isSecure(element) { fail("Secure text field.") }
  // Web editors (Slack, Gmail, Notion) track their own content and can miss text set this way; a paste is safer.
  if isInWebContent(element) { fail("Web content.") }

  var settable: DarwinBoolean = false
  guard AXUIElementIsAttributeSettable(element, kAXSelectedTextAttribute as CFString, &settable) == .success,
    settable.boolValue
  else { fail("Selected text is not settable.") }
  // The value is read before and after to confirm the change, since some apps accept the request and ignore it.
  guard let before = stringAttribute(element, kAXValueAttribute) else { fail("Value is not readable.") }

  guard AXUIElementSetAttributeValue(element, kAXSelectedTextAttribute as CFString, text as CFString) == .success else {
    fail("Could not set the selected text.")
  }
  // Reporting a failure makes PhaseType paste as well, so give a slow app a moment before deciding it ignored this.
  for attempt in 0..<3 {
    if stringAttribute(element, kAXValueAttribute) != before { emit(Output(ok: true)) }
    if attempt < 2 { usleep(50_000) }
  }
  // An unchanged value is still a success when the replacement equals the old selection.
  if text == before { emit(Output(ok: true)) }
  fail("The app ignored the change.")
}

let args = CommandLine.arguments
guard AXIsProcessTrusted() else { fail("Accessibility access not granted.") }

switch args.count > 1 ? args[1] : "" {
case "read":
  read()
case "replace" where args.count > 2:
  let input = FileHandle.standardInput.readDataToEndOfFile()
  guard let text = String(data: input, encoding: .utf8) else { fail("Text on stdin is not UTF-8.") }
  replace(appId: args[2], text: text)
default:
  fail("Usage: phasetype-ax read | replace <appId>")
}
