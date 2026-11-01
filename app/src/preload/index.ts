import { contextBridge, ipcRenderer, type IpcRendererEvent } from 'electron'
import { IPC } from '@shared/constants'
import type { AiStreamEvent, PanelContext, PhaseTypeBridge, QuickFixStatus, Unsubscribe } from '@shared/types'

/** Listens on an IPC channel and returns a function that removes the listener. */
function subscribe<T>(channel: string, listener: (payload: T) => void): Unsubscribe {
  const handler = (_event: IpcRendererEvent, payload: T): void => listener(payload)
  ipcRenderer.on(channel, handler)
  return () => ipcRenderer.removeListener(channel, handler)
}

/** The `window.phasetype` API exposed to the renderer; each method forwards to a main-process IPC channel. */
const bridge: PhaseTypeBridge = {
  settings: {
    get: () => ipcRenderer.invoke(IPC.settingsGet),
    update: (patch) => ipcRenderer.invoke(IPC.settingsUpdate, patch),
    completeOnboarding: () => ipcRenderer.invoke(IPC.settingsCompleteOnboarding)
  },
  ai: {
    verifyKey: (apiKey) => ipcRenderer.invoke(IPC.aiVerifyKey, apiKey),
    run: (request) => ipcRenderer.send(IPC.aiRun, request),
    cancel: (requestId) => ipcRenderer.send(IPC.aiCancel, requestId),
    onEvent: (listener) => subscribe<AiStreamEvent>(IPC.aiEvent, listener)
  },
  hotkey: {
    pause: () => ipcRenderer.invoke(IPC.hotkeyPause),
    resume: () => ipcRenderer.invoke(IPC.hotkeyResume)
  },
  permissions: {
    isAccessibilityGranted: () => ipcRenderer.invoke(IPC.permissionsAccessibilityStatus),
    requestAccessibility: () => ipcRenderer.invoke(IPC.permissionsAccessibilityRequest)
  },
  panel: {
    onOpen: (listener) => subscribe<PanelContext>(IPC.panelOpen, listener),
    onHide: (listener) => subscribe<void>(IPC.panelHidden, listener),
    resize: (height) => ipcRenderer.send(IPC.panelResize, height),
    hide: () => ipcRenderer.send(IPC.panelHide),
    copy: (text) => ipcRenderer.invoke(IPC.panelCopy, text),
    paste: (text) => ipcRenderer.invoke(IPC.panelPaste, text)
  },
  status: {
    onUpdate: (listener) => subscribe<QuickFixStatus | null>(IPC.statusUpdate, listener)
  },
  usage: {
    list: () => ipcRenderer.invoke(IPC.usageList),
    clear: () => ipcRenderer.invoke(IPC.usageClear)
  },
  app: {
    openSettings: () => ipcRenderer.send(IPC.appOpenSettings),
    closeWindow: () => ipcRenderer.send(IPC.appCloseWindow),
    quit: () => ipcRenderer.send(IPC.appQuit),
    getVersion: () => ipcRenderer.invoke(IPC.appVersion)
  }
}

contextBridge.exposeInMainWorld('phasetype', bridge)
