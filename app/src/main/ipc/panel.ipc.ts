import { ipcMain } from 'electron'
import { IPC } from '@shared/constants'
import { pasteIntoSourceApp } from '../controllers'
import { clipboardService } from '../services'
import { hidePanel, resizePanel } from '../windows'

/** Registers IPC handlers for the floating panel: resize, hide, copy and paste the result. */
export function registerPanelIpc(): void {
  ipcMain.on(IPC.panelResize, (_event, height: number) => resizePanel(height))
  ipcMain.on(IPC.panelHide, () => hidePanel())
  ipcMain.handle(IPC.panelCopy, (_event, text: string) => clipboardService.writeText(text))
  ipcMain.handle(IPC.panelPaste, (_event, text: string) => pasteIntoSourceApp(text))
}
