import { Menu, nativeImage, Tray, type NativeImage } from 'electron'
import { readFileSync } from 'fs'
import { formatAccelerator } from '@shared/utils'
import { ASSET_PATHS } from '../constants'
import { openMainWindow } from '../windows'
import { settingsStore } from './settings.store'

let tray: Tray | null = null

/** Rebuilds the tray menu so it reflects the current hotkey and onboarding state. */
function refresh(): void {
  if (!tray) return
  const { onboarded, hotkey } = settingsStore.getSettings()
  tray.setContextMenu(
    Menu.buildFromTemplate([
      { label: onboarded ? `Select text, then press ${formatAccelerator(hotkey)}` : 'Setup is not finished', enabled: false },
      { type: 'separator' },
      { label: onboarded ? 'Settings…' : 'Finish setup…', accelerator: 'Command+,', click: openMainWindow },
      { type: 'separator' },
      { label: 'Quit PhaseType', role: 'quit', accelerator: 'Command+Q' }
    ])
  )
}

/** Loads the menu bar icon with its Retina (@2x) version, as a template so macOS tints it for light/dark menu bars. */
function createTrayImage(): NativeImage {
  const icon = nativeImage.createFromPath(ASSET_PATHS.trayIcon1x)
  icon.addRepresentation({ scaleFactor: 2, buffer: readFileSync(ASSET_PATHS.trayIcon2x) })
  icon.setTemplateImage(true)
  return icon
}

/** Creates the menu bar tray icon and its menu. */
function create(): void {
  tray = new Tray(createTrayImage())
  tray.setToolTip('PhaseType')
  refresh()
}

/** Manages the menu bar (tray) icon and its context menu. */
export const trayService = { create, refresh }
