/** Caps that keep each try small and cheap. Shared by the playground (to stop early) and the API (to enforce). */
export const TRY_LIMITS = {
  maxTextChars: 2000,
  maxInstructionChars: 300,
  /** Earlier turns sent with a follow-up. Older ones are dropped. */
  maxHistoryTurns: 4,
  maxHistoryOutputChars: 4000,
  maxOutputTokens: 700
} as const

/** Rate limits for the free tries, which run on the site owner's OpenAI key. */
export const TRY_RATE_LIMITS = {
  /** Short burst limit per visitor. */
  burst: { limit: 6, windowMs: 60_000 },
  /** Total tries per visitor per day. */
  daily: { limit: 20, windowMs: 24 * 60 * 60_000 },
  /** Total tries across all visitors per day, so a spike can't run up the bill. */
  globalDaily: 1500
} as const

/** Default model for the playground; override with TRY_OPENAI_MODEL. */
export const TRY_DEFAULT_MODEL = 'gpt-4.1-mini'

export const TRY_ENDPOINT = '/api/try'

/** Response header carrying how many tries the visitor has left today. */
export const TRY_REMAINING_HEADER = 'X-Tries-Remaining'
