import { NON_CHAT_MODEL_MARKERS, OPENAI_BASE_URL } from '../../../constants'
import type { AiProvider, StreamCompletionOptions } from '../../../types'

/** Headers for authenticated JSON requests to the OpenAI API. */
const authHeaders = (apiKey: string): Record<string, string> => ({
  Authorization: `Bearer ${apiKey}`,
  'Content-Type': 'application/json'
})

/** Converts a failed OpenAI response into an Error with a user-friendly message. */
async function toApiError(response: Response): Promise<Error> {
  if (response.status === 401) return new Error('OpenAI rejected this API key. Check that it is correct and active.')
  if (response.status === 429) return new Error('OpenAI rate limit reached, or the account is out of credits.')
  try {
    const body = (await response.json()) as { error?: { message?: string } }
    if (body.error?.message) return new Error(body.error.message)
  } catch {
    // Fall through to the generic message.
  }
  return new Error(`OpenAI request failed (${response.status}).`)
}

/** True for model ids that look like chat models (gpt-*, o-series, chatgpt-*), excluding non-chat variants. */
const isChatModel = (id: string): boolean =>
  (id.startsWith('gpt-') || /^o\d/.test(id) || id.startsWith('chatgpt-')) &&
  !NON_CHAT_MODEL_MARKERS.some((marker) => id.includes(marker))

/** Fetches the account's models and returns the chat model ids, sorted. Throws on API errors. */
async function listModels(apiKey: string): Promise<string[]> {
  const response = await fetch(`${OPENAI_BASE_URL}/models`, { headers: authHeaders(apiKey) })
  if (!response.ok) throw await toApiError(response)
  const body = (await response.json()) as { data: { id: string }[] }
  return body.data
    .map((model) => model.id)
    .filter(isChatModel)
    .sort()
}

/** Parses one server-sent-events line and returns its text delta, if any. */
function parseSseLine(line: string): string | null {
  const trimmed = line.trim()
  if (!trimmed.startsWith('data:')) return null
  const payload = trimmed.slice(5).trim()
  if (!payload || payload === '[DONE]') return null
  const chunk = JSON.parse(payload) as { choices?: { delta?: { content?: string | null } }[] }
  return chunk.choices?.[0]?.delta?.content ?? null
}

/**
 * Streams a chat completion, calling `onDelta` for each text chunk as it arrives.
 * Throws on API errors; honours `signal` for cancellation.
 */
async function streamCompletion({ apiKey, model, messages, signal, onDelta }: StreamCompletionOptions): Promise<void> {
  const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: authHeaders(apiKey),
    body: JSON.stringify({ model, messages, stream: true }),
    signal
  })
  if (!response.ok) throw await toApiError(response)
  if (!response.body) throw new Error('OpenAI returned an empty response.')

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''
    for (const line of lines) {
      const delta = parseSseLine(line)
      if (delta) onDelta(delta)
    }
  }

  const trailing = parseSseLine(buffer)
  if (trailing) onDelta(trailing)
}

/** OpenAI implementation of the AI provider interface. */
export const openAiProvider: AiProvider = { listModels, streamCompletion }
