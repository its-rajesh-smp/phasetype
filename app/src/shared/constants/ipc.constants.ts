export const IPC = {
  settingsGet: 'settings:get',
  settingsUpdate: 'settings:update',
  settingsCompleteOnboarding: 'settings:complete-onboarding',

  aiVerifyKey: 'ai:verify-key',
  aiRun: 'ai:run',
  aiCancel: 'ai:cancel',
  aiEvent: 'ai:event',

  hotkeyPause: 'hotkey:pause',
  hotkeyResume: 'hotkey:resume',

  permissionsAccessibilityStatus: 'permissions:accessibility-status',
  permissionsAccessibilityRequest: 'permissions:accessibility-request',

  panelOpen: 'panel:open',
  panelHidden: 'panel:hidden',
  panelResize: 'panel:resize',
  panelHide: 'panel:hide',
  panelCopy: 'panel:copy',
  panelPaste: 'panel:paste',

  statusUpdate: 'status:update',

  appOpenSettings: 'app:open-settings',
  appCloseWindow: 'app:close-window',
  appQuit: 'app:quit',
  appVersion: 'app:version'
} as const
