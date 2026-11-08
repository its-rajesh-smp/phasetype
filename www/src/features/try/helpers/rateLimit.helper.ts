import 'server-only'
import { TRY_RATE_LIMITS } from '../constants/limits.constants'

export type RateLimitResult = { allowed: true; remaining: number } | { allowed: false; reason: string }

/** Request times per visitor within the daily window, newest last. */
const visitorHits = new Map<string, number[]>()
let globalDay = ''
let globalCount = 0

/** Drops visitors with no hits in the daily window, so the map can't grow without bound. */
function prune(now: number): void {
  visitorHits.forEach((hits, key) => {
    if (!hits.some((time) => now - time < TRY_RATE_LIMITS.daily.windowMs)) visitorHits.delete(key)
  })
}

/**
 * Counts one try for the visitor if they are under the burst, daily and global limits.
 *
 * The counts live in this server instance's memory: they reset on restart and aren't shared between serverless
 * instances, so treat them as a cost guard rather than a hard quota. Move them to a shared store (e.g. Redis) if
 * traffic grows.
 */
export function takeTry(visitor: string, now = Date.now()): RateLimitResult {
  const { burst, daily, globalDaily } = TRY_RATE_LIMITS
  const today = new Date(now).toISOString().slice(0, 10)
  if (today !== globalDay) {
    globalDay = today
    globalCount = 0
  }
  if (globalCount >= globalDaily) {
    return { allowed: false, reason: 'The free tries are used up for today. Download PhaseType to keep going.' }
  }

  if (visitorHits.size > 10_000) prune(now)
  const hits = (visitorHits.get(visitor) ?? []).filter((time) => now - time < daily.windowMs)
  if (hits.length >= daily.limit) {
    return { allowed: false, reason: `You've used all ${daily.limit} free tries for today. Download PhaseType to keep going.` }
  }
  if (hits.filter((time) => now - time < burst.windowMs).length >= burst.limit) {
    return { allowed: false, reason: 'That was quick! Wait a minute and try again.' }
  }

  visitorHits.set(visitor, [...hits, now])
  globalCount += 1
  return { allowed: true, remaining: daily.limit - hits.length - 1 }
}
