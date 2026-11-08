import 'server-only'
import { TRY_DEFAULT_MODEL, TRY_LIMITS } from '../constants/limits.constants'
import type { ChatMessage } from './buildMessages.helper'

const OPENAI_CHAT_URL = 'https://api.openai.com/v1/chat/completions'

/** The text delta in one server-sent-events line from OpenAI, if any. */
function parseDelta(line: string): string {
  const trimmed = line.trim()
  if (!trimmed.startsWith('data:')) return ''
  const payload = trimmed.slice(5).trim()
  if (!payload || payload === '[DONE]') return ''
  try {
    const chunk = JSON.parse(payload) as { choices?: { delta?: { content?: string | null } }[] }
    return chunk.choices?.[0]?.delta?.content ?? ''
  } catch {
    return ''
  }
}

/** Turns OpenAI's SSE byte stream into a plain UTF-8 text stream of just the answer. */
function toTextStream(body: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()
  let buffer = ''

  return body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''
        const text = lines.map(parseDelta).join('')
        if (text) controller.enqueue(encoder.encode(text))
      },
      flush(controller) {
        const text = parseDelta(buffer)
        if (text) controller.enqueue(encoder.encode(text))
      }
    })
  )
}

/**
 * Starts a streamed chat completion with the server's key and returns the answer as a text stream.
 * Throws if the key is missing or OpenAI refuses the request; the cause is logged, not shown to visitors.
 */
export async function streamOpenAiText(messages: ChatMessage[], signal: AbortSignal): Promise<ReadableStream<Uint8Array>> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set.')

  const response = await fetch(OPENAI_CHAT_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: process.env.TRY_OPENAI_MODEL || TRY_DEFAULT_MODEL,
      messages,
      stream: true,
      max_completion_tokens: TRY_LIMITS.maxOutputTokens
    }),
    signal
  })
  if (!response.ok || !response.body) {
    const detail = await response.text().catch(() => '')
    throw new Error(`OpenAI request failed (${response.status}): ${detail.slice(0, 300)}`)
  }
  return toTextStream(response.body)
}
