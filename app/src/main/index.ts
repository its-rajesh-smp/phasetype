import { app } from 'electron'
import { registerHotkeys } from './controllers'
import { ASSET_PATHS } from './constants'
import { registerIpcHandlers } from './ipc'
import { aiService, hotkeyService, settingsStore, trayService } from './services'
import { createPanelWindow, createStatusWindow, openMainWindow } from './windows'

/**
 * Starts the app: IPC, tray, panel and status pill. Registers the hotkeys and hides the Dock icon if setup is done,
 * otherwise opens the setup window.
 */
function bootstrap(): void {
  // The packaged app gets its Dock icon from the .icns; in development Electron would show its own.
  if (!app.isPackaged) app.dock?.setIcon(ASSET_PATHS.appIcon)
  registerIpcHandlers()
  trayService.create()
  createPanelWindow()
  createStatusWindow()

  const ready = settingsStore.getSettings().onboarded && registerHotkeys().ok
  if (ready) app.dock?.hide()
  else openMainWindow()
}

if (!app.requestSingleInstanceLock()) {
  app.quit()
} else {
  app.on('second-instance', openMainWindow)
  // Re-opening the app (Finder, Spotlight, Dock) shows Settings.
  app.on('activate', (_event, hasVisibleWindows) => {
    if (!hasVisibleWindows) openMainWindow()
  })
  // PhaseType lives in the menu bar, so closing every window must not quit it.
  app.on('window-all-closed', () => undefined)
  app.on('will-quit', () => {
    hotkeyService.unregisterAll()
    aiService.cancelAll()
  })

  void app.whenReady().then(bootstrap)
}
