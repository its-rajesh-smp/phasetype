import { app, BrowserWindow, shell } from 'electron'
import { MAIN_WINDOW } from '../constants'
import { loadView, PRELOAD_PATH } from './loadView'

let mainWindow: BrowserWindow | null = null

/** Opens the setup/settings window, or focuses it if it is already open. */
export function openMainWindow(): void {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.show()
    mainWindow.focus()
    return
  }

  mainWindow = new BrowserWindow({
    ...MAIN_WINDOW,
    show: false,
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 18, y: 18 },
    webPreferences: { preload: PRELOAD_PATH, sandbox: true, contextIsolation: true }
  })

  mainWindow.once('ready-to-show', () => {
    void app.dock?.show()
    mainWindow?.show()
  })
  mainWindow.on('closed', () => {
    mainWindow = null
    app.dock?.hide()
  })
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    void shell.openExternal(url)
    return { action: 'deny' }
  })

  loadView(mainWindow, 'main')
}

/** True if the settings window exists and is currently visible. */
export const isMainWindowOpen = (): boolean => Boolean(mainWindow && !mainWindow.isDestroyed() && mainWindow.isVisible())
