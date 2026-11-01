import { ipcMain } from 'electron'
import { IPC } from '@shared/constants'
import { usageStore } from '../services'

/** Registers IPC handlers to read and clear the local request history. */
export function registerUsageIpc(): void {
  ipcMain.handle(IPC.usageList, () => usageStore.list())
  ipcMain.handle(IPC.usageClear, () => usageStore.clear())
}
