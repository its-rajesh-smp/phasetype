import { ipcMain } from 'electron'
import { IPC } from '@shared/constants'
import type { AiRunRequest } from '@shared/types'
import { aiService } from '../services'

/** Registers IPC handlers to verify an API key, start a streamed AI run and cancel it. */
export function registerAiIpc(): void {
  ipcMain.handle(IPC.aiVerifyKey, (_event, apiKey?: string) => aiService.verifyKey(apiKey))
  ipcMain.on(IPC.aiRun, (event, request: AiRunRequest) => void aiService.run(request, event.sender))
  ipcMain.on(IPC.aiCancel, (_event, requestId: string) => aiService.cancel(requestId))
}
