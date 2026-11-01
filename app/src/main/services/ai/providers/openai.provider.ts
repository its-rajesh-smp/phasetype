import type { TokenUsage } from '@shared/types'
import { NON_CHAT_MODEL_MARKERS, OPENAI_BASE_URL, OPENAI_TRANSCRIBE_MODEL } from '../../../constants'
import type { AiProvider, StreamCompletionOptions, TranscribeOptions, Transcription } from '../../../types'

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

interface OpenAiUsage {
  prompt_tokens?: number
  completion_tokens?: number
  prompt_tokens_details?: { cached_tokens?: number }
}

const toTokenUsage = (usage: OpenAiUsage): TokenUsage => ({
  inputTokens: usage.prompt_tokens ?? 0,
  cachedInputTokens: usage.prompt_tokens_details?.cached_tokens ?? 0,
  outputTokens: usage.completion_tokens ?? 0
})

interface SseChunk {
  delta: string | null
  usage: TokenUsage | null
}

/** Parses one server-sent-events line into its text delta and, on the final chunk, the tokens used. */
function parseSseLine(line: string): SseChunk | null {
  const trimmed = line.trim()
  if (!trimmed.startsWith('data:')) return null
  const payload = trimmed.slice(5).trim()
  if (!payload || payload === '[DONE]') return null
  const chunk = JSON.parse(payload) as { choices?: { delta?: { content?: string | null } }[]; usage?: OpenAiUsage | null }
  return { delta: chunk.choices?.[0]?.delta?.content ?? null, usage: chunk.usage ? toTokenUsage(chunk.usage) : null }
}

/**
 * Streams a chat completion, calling `onDelta` for each text chunk as it arrives, and resolves with the tokens used.
 * Throws on API errors; honours `signal` for cancellation.
 */
async function streamCompletion({ apiKey, model, messages, signal, onDelta }: StreamCompletionOptions): Promise<TokenUsage | null> {
  const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: authHeaders(apiKey),
    // The usage arrives in one extra chunk at the end of the stream.
    body: JSON.stringify({ model, messages, stream: true, stream_options: { include_usage: true } }),
    signal
  })
  if (!response.ok) throw await toApiError(response)
  if (!response.body) throw new Error('OpenAI returned an empty response.')

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let usage: TokenUsage | null = null
  const handle = (chunk: SseChunk | null): void => {
    if (chunk?.delta) onDelta(chunk.delta)
    if (chunk?.usage) usage = chunk.usage
  }

  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''
    lines.forEach((line) => handle(parseSseLine(line)))
  }

  handle(parseSseLine(buffer))
  return usage
}

/** Transcribes one audio clip. Throws on API errors; honours `signal` for cancellation. */
async function transcribe({ apiKey, clip, signal }: TranscribeOptions): Promise<Transcription> {
  const form = new FormData()
  form.append('model', OPENAI_TRANSCRIBE_MODEL)
  form.append('response_format', 'json')
  form.append('file', new Blob([new Uint8Array(clip.data)], { type: 'audio/mp4' }), clip.filename)

  const response = await fetch(`${OPENAI_BASE_URL}/audio/transcriptions`, {
    method: 'POST',
    // No Content-Type: fetch sets the multipart boundary itself.
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form,
    signal
  })
  if (!response.ok) throw await toApiError(response)
  const body = (await response.json()) as { text?: string; usage?: { input_tokens?: number; output_tokens?: number } }
  const usage = body.usage
    ? { inputTokens: body.usage.input_tokens ?? 0, cachedInputTokens: 0, outputTokens: body.usage.output_tokens ?? 0 }
    : null
  return { text: body.text ?? '', model: OPENAI_TRANSCRIBE_MODEL, usage }
}

/** OpenAI implementation of the AI provider interface. */
export const openAiProvider: AiProvider = { listModels, streamCompletion, transcribe }
