import type { WebContents } from 'electron'
import { IPC } from '@shared/constants'
import type { AiRunRequest, AiStreamEvent, Result } from '@shared/types'
import { buildMessages } from '../../helpers'
import { isAbortError, toErrorMessage } from '../../utils'
import { settingsStore } from '../settings.store'
import { getProvider } from './provider.registry'

const activeRequests = new Map<string, AbortController>()

/**
 * Checks an API key (or the saved one) by listing its chat models.
 * Returns the models on success, or an error result if the key is missing, invalid or has no chat models.
 */
async function verifyKey(apiKey?: string): Promise<Result<string[]>> {
  const key = apiKey?.trim() || settingsStore.getApiKey()
  if (!key) return { ok: false, error: 'Add your OpenAI API key first.' }
  try {
    const models = await getProvider(settingsStore.getSettings().provider).listModels(key)
    if (models.length === 0) return { ok: false, error: 'This key works, but it has no chat models available.' }
    return { ok: true, data: models }
  } catch (error) {
    return { ok: false, error: toErrorMessage(error) }
  }
}

/**
 * Streams an AI completion for the request, sending delta/done/error events to the renderer.
 * The request can be cancelled by id; cancellation does not emit an error.
 */
async function run(request: AiRunRequest, sender: WebContents): Promise<void> {
  /** Sends a stream event to the renderer if its window still exists. */
  const emit = (event: AiStreamEvent): void => {
    if (!sender.isDestroyed()) sender.send(IPC.aiEvent, event)
  }
  const { requestId } = request
  const apiKey = settingsStore.getApiKey()
  const settings = settingsStore.getSettings()

  if (!apiKey || !settings.model) {
    emit({ requestId, type: 'error', message: 'Finish setup in Settings: an API key and model are required.' })
    return
  }

  const controller = new AbortController()
  activeRequests.set(requestId, controller)

  try {
    await getProvider(settings.provider).streamCompletion({
      apiKey,
      model: settings.model,
      messages: buildMessages({ systemPrompt: settings.systemPrompt, ...request }),
      signal: controller.signal,
      onDelta: (delta) => emit({ requestId, type: 'delta', delta })
    })
    emit({ requestId, type: 'done' })
  } catch (error) {
    if (!isAbortError(error)) emit({ requestId, type: 'error', message: toErrorMessage(error) })
  } finally {
    activeRequests.delete(requestId)
  }
}

/** Aborts the in-flight request with this id, if any. */
function cancel(requestId: string): void {
  activeRequests.get(requestId)?.abort()
  activeRequests.delete(requestId)
}

/** Aborts every in-flight request (used when the app quits). */
function cancelAll(): void {
  activeRequests.forEach((controller) => controller.abort())
  activeRequests.clear()
}

/** Runs AI requests against the configured provider and streams results back to the renderer. */
export const aiService = { verifyKey, run, cancel, cancelAll }
