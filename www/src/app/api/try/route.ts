import { TRY_REMAINING_HEADER } from '@/features/try/constants/limits.constants'
import { buildTryMessages } from '@/features/try/helpers/buildMessages.helper'
import { streamOpenAiText } from '@/features/try/helpers/openaiStream.helper'
import { takeTry } from '@/features/try/helpers/rateLimit.helper'
import { clientIp, isSameOrigin } from '@/features/try/helpers/request.helper'
import { validateTryRequest } from '@/features/try/helpers/validateRequest.helper'
import type { TryErrorBody, TryErrorKind } from '@/features/try/types/try.types'

export const maxDuration = 30

const fail = (status: number, kind: TryErrorKind, error: string): Response =>
  Response.json({ error, kind } satisfies TryErrorBody, { status })

/** Streams a PhaseType answer for the web playground, using the site's OpenAI key within the free-try limits. */
export async function POST(request: Request): Promise<Response> {
  if (!isSameOrigin(request)) return fail(403, 'invalid', 'Requests must come from the PhaseType site.')

  const body: unknown = await request.json().catch(() => null)
  const validation = validateTryRequest(body)
  if (!validation.ok) return fail(400, 'invalid', validation.error)

  const quota = takeTry(clientIp(request))
  if (!quota.allowed) return fail(429, 'limit', quota.reason)

  try {
    const stream = await streamOpenAiText(buildTryMessages(validation.data), request.signal)
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
        [TRY_REMAINING_HEADER]: String(quota.remaining)
      }
    })
  } catch (error) {
    if (request.signal.aborted) return new Response(null, { status: 499 })
    console.error('[api/try]', error)
    return fail(502, 'unavailable', 'PhaseType could not answer just now. Try again in a moment.')
  }
}
