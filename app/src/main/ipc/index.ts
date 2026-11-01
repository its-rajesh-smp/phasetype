import { registerAiIpc } from './ai.ipc'
import { registerAppIpc } from './app.ipc'
import { registerHotkeyIpc } from './hotkey.ipc'
import { registerPanelIpc } from './panel.ipc'
import { registerPermissionsIpc } from './permissions.ipc'
import { registerSettingsIpc } from './settings.ipc'
import { registerUsageIpc } from './usage.ipc'

/** Registers every main-process IPC handler. Call once at startup. */
export function registerIpcHandlers(): void {
  registerSettingsIpc()
  registerAiIpc()
  registerHotkeyIpc()
  registerPermissionsIpc()
  registerPanelIpc()
  registerAppIpc()
  registerUsageIpc()
}
