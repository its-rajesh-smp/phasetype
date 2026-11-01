/** Where a request came from: the panel, or the quick fix hotkey. */
export type UsageSource = 'panel' | 'quickFix'

/** How a request ended. Cancelled and failed requests are only kept when they already cost something. */
export type UsageStatus = 'done' | 'error' | 'cancelled'

export interface TokenUsage {
  /** Every input token, including cached ones. */
  inputTokens: number
  /** Input tokens served from the provider's prompt cache, which are billed at a lower rate. */
  cachedInputTokens: number
  outputTokens: number
}

/** The tokens one model used for a request, and what they cost. */
export interface UsagePart {
  model: string
  usage: TokenUsage
  /** Estimated cost in US dollars, from PhaseType's price list when the request ran. Null if the model's price isn't known. */
  costUsd: number | null
}

/** One AI request, as kept in the local history. */
export interface UsageRecord {
  id: string
  /** When the request finished, in milliseconds since the epoch. */
  createdAt: number
  source: UsageSource
  /** The chat model the request was sent to. */
  model: string
  /** What was asked: a quick action's label or the typed prompt. */
  instruction: string
  presetName: string | null
  /** The start of the selected text, if any. */
  inputPreview: string
  /** The start of the answer. */
  outputPreview: string
  attachmentNames: string[]
  status: UsageStatus
  error: string | null
  /** Tokens the chat model used. Null if the request didn't get that far. */
  chat: UsagePart | null
  /** Tokens used to transcribe audio and video, if the request had any that weren't transcribed earlier. */
  transcription: UsagePart | null
}
