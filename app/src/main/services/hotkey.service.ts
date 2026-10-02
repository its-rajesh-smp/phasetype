import { globalShortcut } from 'electron'

let currentAccelerator: string | null = null
let currentHandler: (() => void) | null = null

/** Registers a global shortcut, returning false instead of throwing if it is taken or malformed. */
function tryRegister(accelerator: string, handler: () => void): boolean {
  try {
    return globalShortcut.register(accelerator, handler)
  } catch {
    // Electron throws for malformed accelerators.
    return false
  }
}

/** Registers the hotkey, replacing the previous one. Keeps the previous one if this fails. */
function register(accelerator: string, handler: () => void): boolean {
  const previous = currentAccelerator
  if (previous) globalShortcut.unregister(previous)

  if (tryRegister(accelerator, handler)) {
    currentAccelerator = accelerator
    currentHandler = handler
    return true
  }
  if (previous && currentHandler) tryRegister(previous, currentHandler)
  return false
}

/** Checks whether a shortcut is free without keeping it registered. */
function isAvailable(accelerator: string): boolean {
  if (accelerator === currentAccelerator) return true
  const ok = tryRegister(accelerator, () => undefined)
  if (ok) globalShortcut.unregister(accelerator)
  return ok
}

/** Temporarily unregisters the current hotkey (it stays remembered for `resume`). */
function pause(): void {
  if (currentAccelerator) globalShortcut.unregister(currentAccelerator)
}

/** Re-registers the current hotkey after `pause`, if it is not already registered. */
function resume(): void {
  if (currentAccelerator && currentHandler && !globalShortcut.isRegistered(currentAccelerator)) {
    tryRegister(currentAccelerator, currentHandler)
  }
}

/** Manages the single global hotkey that opens the panel. */
export const hotkeyService = { register, isAvailable, pause, resume, unregisterAll: () => globalShortcut.unregisterAll() }
