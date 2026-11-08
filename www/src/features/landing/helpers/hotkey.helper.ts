import type { TakenHotkey } from '../types/landing.types'

const MODIFIERS: [keyof Pick<KeyboardEvent, 'ctrlKey' | 'altKey' | 'shiftKey' | 'metaKey'>, string][] = [
  ['ctrlKey', '⌃'],
  ['altKey', '⌥'],
  ['shiftKey', '⇧'],
  ['metaKey', '⌘']
]

const MODIFIER_CODES = new Set(['ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'MetaLeft', 'MetaRight', 'CapsLock', 'Fn'])

const NAMED_KEYS: Record<string, string> = { Space: 'Space', Enter: '↩', Backspace: '⌫', Tab: 'Tab', ArrowUp: '↑', ArrowDown: '↓', ArrowLeft: '←', ArrowRight: '→' }

/** Turns a key press into macOS key caps (⌘ ⇧ K). Returns null until a modifier plus a regular key are held. */
export function keysFromEvent(event: KeyboardEvent): string[] | null {
  if (MODIFIER_CODES.has(event.code)) return null

  const modifiers = MODIFIERS.filter(([flag]) => event[flag]).map(([, symbol]) => symbol)
  if (modifiers.length === 0) return null

  // Read the physical key, since ⌥ changes event.key into a special character on a Mac.
  const key = NAMED_KEYS[event.code] ?? event.code.replace(/^(Key|Digit)/, '')
  return [...modifiers, key.length === 1 ? key.toUpperCase() : key]
}

/** The app that already owns a shortcut, if any. */
export function findHotkeyOwner(keys: readonly string[], taken: TakenHotkey[]): string | null {
  const id = keys.join('+')
  return taken.find((hotkey) => hotkey.keys.join('+') === id)?.owner ?? null
}
