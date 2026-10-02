import { ipcMain } from 'electron'
import { IPC } from '@shared/constants'
import { hotkeyService } from '../services'

/** Registers IPC handlers to pause/resume the global hotkey (e.g. while recording a new shortcut). */
export function registerHotkeyIpc(): void {
  ipcMain.handle(IPC.hotkeyPause, () => hotkeyService.pause())
  ipcMain.handle(IPC.hotkeyResume, () => hotkeyService.resume())
}
