import { ipcMain } from 'electron'
import { IPC } from '@shared/constants'
import type { SettingsUpdate } from '@shared/types'
import { completeOnboarding, updateSettings } from '../controllers'
import { settingsStore } from '../services'

/** Registers IPC handlers to read and update settings and to finish onboarding. */
export function registerSettingsIpc(): void {
  ipcMain.handle(IPC.settingsGet, () => settingsStore.getPublicSettings())
  ipcMain.handle(IPC.settingsUpdate, (_event, patch: SettingsUpdate) => updateSettings(patch))
  ipcMain.handle(IPC.settingsCompleteOnboarding, () => completeOnboarding())
}
