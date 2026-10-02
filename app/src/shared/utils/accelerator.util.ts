const KEY_SYMBOLS: Record<string, string> = {
  Command: '⌘',
  Cmd: '⌘',
  CommandOrControl: '⌘',
  CmdOrCtrl: '⌘',
  Super: '⌘',
  Meta: '⌘',
  Control: '⌃',
  Ctrl: '⌃',
  Alt: '⌥',
  Option: '⌥',
  Shift: '⇧',
  Return: '↩',
  Enter: '↩',
  Backspace: '⌫',
  Delete: '⌦',
  Escape: 'esc',
  Tab: '⇥',
  Up: '↑',
  Down: '↓',
  Left: '←',
  Right: '→'
}

/** "Control+Alt+Space" → ["⌃", "⌥", "Space"] */
export const acceleratorToKeys = (accelerator: string): string[] =>
  accelerator
    .split('+')
    .filter(Boolean)
    .map((part) => KEY_SYMBOLS[part] ?? part)

/** "Control+Alt+Space" → "⌃⌥Space" */
export const formatAccelerator = (accelerator: string): string => acceleratorToKeys(accelerator).join('')
