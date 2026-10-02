import { globalShortcut } from 'electron'
import type { HotkeySettingKey } from '@shared/types'

interface RegisteredHotkey {
  accelerator: string
  handler: () => void
}

const registered = new Map<HotkeySettingKey, RegisteredHotkey>()

/** Registers a global shortcut, returning false instead of throwing if it is taken or malformed. */
function tryRegister(accelerator: string, handler: () => void): boolean {
  try {
    return globalShortcut.register(accelerator, handler)
  } catch {
    // Electron throws for malformed accelerators.
    return false
  }
}

/** Registers the hotkey for `key`, replacing its previous one. Keeps the previous one if this fails. */
function register(key: HotkeySettingKey, accelerator: string, handler: () => void): boolean {
  const previous = registered.get(key)
  if (previous) globalShortcut.unregister(previous.accelerator)

  if (tryRegister(accelerator, handler)) {
    registered.set(key, { accelerator, handler })
    return true
  }
  if (previous) tryRegister(previous.accelerator, previous.handler)
  return false
}

/** Checks whether a shortcut is free without keeping it registered. */
function isAvailable(accelerator: string): boolean {
  if ([...registered.values()].some((hotkey) => hotkey.accelerator === accelerator)) return true
  const ok = tryRegister(accelerator, () => undefined)
  if (ok) globalShortcut.unregister(accelerator)
  return ok
}

/** Temporarily unregisters every hotkey (they stay remembered for `resume`). */
function pause(): void {
  registered.forEach(({ accelerator }) => globalShortcut.unregister(accelerator))
}

/** Re-registers the hotkeys after `pause`, skipping any that are already registered. */
function resume(): void {
  registered.forEach(({ accelerator, handler }) => {
    if (!globalShortcut.isRegistered(accelerator)) tryRegister(accelerator, handler)
  })
}

/** Manages the global hotkeys: one opens the panel, one runs the quick fix. */
export const hotkeyService = {
  register,
  isAvailable,
  pause,
  resume,
  unregisterAll: (): void => {
    globalShortcut.unregisterAll()
    registered.clear()
  }
}
