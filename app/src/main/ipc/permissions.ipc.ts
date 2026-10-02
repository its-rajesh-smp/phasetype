import { ipcMain } from 'electron'
import { IPC } from '@shared/constants'
import { permissionsService } from '../services'

/** Registers IPC handlers to check and request macOS Accessibility access. */
export function registerPermissionsIpc(): void {
  ipcMain.handle(IPC.permissionsAccessibilityStatus, () => permissionsService.isAccessibilityGranted())
  ipcMain.handle(IPC.permissionsAccessibilityRequest, () => permissionsService.requestAccessibility())
}
