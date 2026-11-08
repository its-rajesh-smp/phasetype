import { TRY_ENDPOINT, TRY_REMAINING_HEADER } from '../constants/limits.constants'
import type { TryErrorBody, TryErrorKind, TryRequest } from '../types/try.types'

/** A refused or failed try, with a message that is safe to show the visitor. */
export class TryRequestError extends Error {
  constructor(
    message: string,
    readonly kind: TryErrorKind
  ) {
    super(message)
  }
}

interface StreamTryOptions {
  request: TryRequest
  signal: AbortSignal
  onDelta: (delta: string) => void
  /** Called once the server accepts the try, with the tries left today. */
  onRemaining: (remaining: number) => void
}

/** Reads the error body the API sends before streaming, falling back to a generic message. */
async function toTryError(response: Response): Promise<TryRequestError> {
  try {
    const body = (await response.json()) as Partial<TryErrorBody>
    if (body.error && body.kind) return new TryRequestError(body.error, body.kind)
  } catch {
    // Fall through to the generic message.
  }
  return new TryRequestError('PhaseType could not answer just now. Try again in a moment.', 'unavailable')
}

/**
 * Posts a try to the API and streams the answer, calling `onDelta` for each chunk. A streamed body can't be read
 * through axios in the browser, so this uses fetch with a stream reader. Throws `TryRequestError` on refusal.
 */
export async function streamTry({ request, signal, onDelta, onRemaining }: StreamTryOptions): Promise<void> {
  const response = await fetch(TRY_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
    signal
  })
  if (!response.ok) throw await toTryError(response)
  if (!response.body) throw new TryRequestError('PhaseType returned an empty answer. Try again.', 'unavailable')

  const remaining = Number(response.headers.get(TRY_REMAINING_HEADER))
  if (Number.isFinite(remaining)) onRemaining(remaining)

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    const text = decoder.decode(value, { stream: true })
    if (text) onDelta(text)
  }
}
