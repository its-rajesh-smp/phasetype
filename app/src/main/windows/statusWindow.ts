import { BrowserWindow, screen } from 'electron'
import { IPC } from '@shared/constants'
import type { QuickFixStatus } from '@shared/types'
import { STATUS_WINDOW } from '../constants'
import { loadView, PRELOAD_PATH } from './loadView'

let statusWindow: BrowserWindow | null = null
let hideTimer: NodeJS.Timeout | null = null

/**
 * Creates the hidden status pill window. It never takes focus and lets clicks pass through,
 * so the app the user is typing in stays frontmost while the quick fix runs.
 */
export function createStatusWindow(): void {
  statusWindow = new BrowserWindow({
    width: STATUS_WINDOW.width,
    height: STATUS_WINDOW.height,
    show: false,
    frame: false,
    transparent: true,
    backgroundColor: '#00000000',
    hasShadow: false,
    resizable: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    focusable: false,
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

  statusWindow.setAlwaysOnTop(true, 'screen-saver')
  statusWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true, skipTransformProcessType: true })
  statusWindow.setIgnoreMouseEvents(true)

  loadView(statusWindow, 'status')
}

/** Centers the window horizontally near the bottom of the display the cursor is on. */
function positionOnActiveDisplay(window: BrowserWindow): void {
  const { workArea } = screen.getDisplayNearestPoint(screen.getCursorScreenPoint())
  const x = Math.round(workArea.x + (workArea.width - STATUS_WINDOW.width) / 2)
  const y = Math.round(workArea.y + workArea.height - STATUS_WINDOW.height - STATUS_WINDOW.bottomOffset)
  window.setPosition(x, y)
}

/** Shows the status pill without focusing it. Done and error states hide themselves after a moment. */
export function showStatus(status: QuickFixStatus): void {
  if (!statusWindow || statusWindow.isDestroyed()) return
  if (hideTimer) clearTimeout(hideTimer)
  hideTimer = null

  statusWindow.webContents.send(IPC.statusUpdate, status)
  if (!statusWindow.isVisible()) {
    positionOnActiveDisplay(statusWindow)
    statusWindow.showInactive()
  }

  if (status.state !== 'working') {
    const duration = status.state === 'done' ? STATUS_WINDOW.doneDurationMs : STATUS_WINDOW.errorDurationMs
    hideTimer = setTimeout(hideStatus, duration)
  }
}

/** Hides the status pill. */
export function hideStatus(): void {
  if (hideTimer) clearTimeout(hideTimer)
  hideTimer = null
  if (!statusWindow || statusWindow.isDestroyed()) return
  statusWindow.hide()
  // Clear it so the next show doesn't flash the previous state.
  statusWindow.webContents.send(IPC.statusUpdate, null)
}
