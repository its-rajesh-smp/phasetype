import { app, BrowserWindow, screen } from 'electron'
import { IPC } from '@shared/constants'
import type { PanelContext } from '@shared/types'
import { PANEL_WINDOW } from '../constants'
import { isMainWindowOpen } from './mainWindow'
import { loadView, PRELOAD_PATH } from './loadView'

let panel: BrowserWindow | null = null

/** Creates the hidden, frameless, always-on-top panel window. It hides itself when it loses focus. */
export function createPanelWindow(): void {
  panel = new BrowserWindow({
    width: PANEL_WINDOW.width,
    height: PANEL_WINDOW.initialHeight,
    show: false,
    frame: false,
    transparent: true,
    backgroundColor: '#00000000',
    hasShadow: true,
    resizable: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    type: 'panel',
    webPreferences: {
      preload: PRELOAD_PATH,
      sandbox: true,
      contextIsolation: true,
      backgroundThrottling: false
    }
  })

  panel.setAlwaysOnTop(true, 'floating')
  panel.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true, skipTransformProcessType: true })
  panel.on('blur', () => {
    if (!panel?.webContents.isDevToolsOpened()) hidePanel()
  })

  loadView(panel, 'panel')
}

/** Centers the panel horizontally in the upper part of the display the cursor is on. */
function positionOnActiveDisplay(window: BrowserWindow): void {
  const { workArea } = screen.getDisplayNearestPoint(screen.getCursorScreenPoint())
  const x = Math.round(workArea.x + (workArea.width - PANEL_WINDOW.width) / 2)
  const y = Math.round(workArea.y + workArea.height * PANEL_WINDOW.topOffsetRatio)
  window.setPosition(x, y)
}

/** Positions the panel on the active display, sends it the selection context, then shows and focuses it. */
export function showPanel(context: PanelContext): void {
  if (!panel || panel.isDestroyed()) return
  positionOnActiveDisplay(panel)
  panel.webContents.send(IPC.panelOpen, context)
  panel.show()
  panel.focus()
  app.focus({ steal: true })
}

/**
 * Hides the panel. With `restoreFocus`, also hands focus back to the previous app
 * (unless the settings window is open, which would be hidden too).
 */
export function hidePanel({ restoreFocus = true }: { restoreFocus?: boolean } = {}): void {
  if (!panel || panel.isDestroyed() || !panel.isVisible()) return
  panel.hide()
  panel.webContents.send(IPC.panelHidden)
  if (restoreFocus && !isMainWindowOpen()) app.hide()
}

/** True if the panel window exists and is currently shown. */
export const isPanelVisible = (): boolean => Boolean(panel && !panel.isDestroyed() && panel.isVisible())

/** Resizes the panel height to fit its content, clamped to the configured min/max height. */
export function resizePanel(contentHeight: number): void {
  if (!panel || panel.isDestroyed()) return
  const height = Math.round(Math.min(Math.max(contentHeight, PANEL_WINDOW.minHeight), PANEL_WINDOW.maxHeight))
  const [width] = panel.getSize()
  panel.setSize(width, height)
}
