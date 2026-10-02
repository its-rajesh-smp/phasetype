import { app, type BrowserWindow } from 'electron'
import { join } from 'path'

export type RendererView = 'main' | 'panel' | 'status'

export const PRELOAD_PATH = join(__dirname, '../preload/index.js')

/**
 * Loads a renderer view into the window: the dev server URL in development, the bundled HTML otherwise.
 * The view is selected via the URL hash (`#/main`, `#/panel` or `#/status`).
 */
export function loadView(window: BrowserWindow, view: RendererView): void {
  const devServerUrl = process.env['ELECTRON_RENDERER_URL']
  if (!app.isPackaged && devServerUrl) {
    void window.loadURL(`${devServerUrl}#/${view}`)
  } else {
    void window.loadFile(join(__dirname, '../renderer/index.html'), { hash: `/${view}` })
  }
}
