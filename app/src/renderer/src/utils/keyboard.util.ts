const CODE_TO_KEY: Record<string, string> = {
  Space: 'Space',
  Enter: 'Return',
  Tab: 'Tab',
  Backspace: 'Backspace',
  Delete: 'Delete',
  ArrowUp: 'Up',
  ArrowDown: 'Down',
  ArrowLeft: 'Left',
  ArrowRight: 'Right',
  Minus: '-',
  Equal: '=',
  BracketLeft: '[',
  BracketRight: ']',
  Semicolon: ';',
  Quote: "'",
  Comma: ',',
  Period: '.',
  Slash: '/',
  Backslash: '\\',
  Backquote: '`'
}

/**
 * Maps a physical key `code` to its accelerator key name, or null if unsupported. Uses `code` rather
 * than `key` because ⌥ changes `key` on macOS (⌥A → "å").
 */
function codeToKey(code: string): string | null {
  if (CODE_TO_KEY[code]) return CODE_TO_KEY[code]
  if (/^Key[A-Z]$/.test(code)) return code.slice(3)
  if (/^Digit\d$/.test(code)) return code.slice(5)
  if (/^F\d{1,2}$/.test(code)) return code
  return null
}

/** Lists the modifier keys held during the event, as accelerator names (Command, Control, Alt, Shift). */
export const getModifiers = (event: KeyboardEvent): string[] =>
  [
    event.metaKey && 'Command',
    event.ctrlKey && 'Control',
    event.altKey && 'Alt',
    event.shiftKey && 'Shift'
  ].filter((modifier): modifier is string => Boolean(modifier))

export type KeyboardShortcutResult =
  | { kind: 'modifiers-only'; modifiers: string[] }
  | { kind: 'missing-modifier' }
  | { kind: 'unsupported' }
  | { kind: 'shortcut'; accelerator: string }

/** Turns a keydown into an Electron accelerator such as "Control+Alt+Space". */
export function eventToAccelerator(event: KeyboardEvent): KeyboardShortcutResult {
  const modifiers = getModifiers(event)
  const key = codeToKey(event.code)
  if (!key) return modifiers.length ? { kind: 'modifiers-only', modifiers } : { kind: 'unsupported' }

  const isFunctionKey = /^F\d{1,2}$/.test(key)
  const hasRealModifier = modifiers.some((modifier) => modifier !== 'Shift')
  if (!hasRealModifier && !isFunctionKey) return { kind: 'missing-modifier' }

  return { kind: 'shortcut', accelerator: [...modifiers, key].join('+') }
}
