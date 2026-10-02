import { app, BrowserWindow, ipcMain } from 'electron'
import { IPC } from '@shared/constants'
import { hidePanel, openMainWindow } from '../windows'

/** Registers IPC handlers for app-level actions: open settings, close window, quit and version. */
export function registerAppIpc(): void {
  ipcMain.on(IPC.appOpenSettings, () => {
    hidePanel({ restoreFocus: false })
    openMainWindow()
  })
  ipcMain.on(IPC.appCloseWindow, (event) => BrowserWindow.fromWebContents(event.sender)?.close())
  ipcMain.on(IPC.appQuit, () => app.quit())
  ipcMain.handle(IPC.appVersion, () => app.getVersion())
}
