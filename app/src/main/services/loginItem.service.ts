import { app } from 'electron'

/** Turns "launch at login" on or off for the app. */
export const loginItemService = {
  set: (openAtLogin: boolean): void => app.setLoginItemSettings({ openAtLogin })
}
