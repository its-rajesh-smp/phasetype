import { randomUUID } from 'crypto'
import type { TokenUsage, UsagePart, UsageRecord, UsageSource, UsageStatus } from '@shared/types'
import { MODEL_PRICES, USAGE_INPUT_PREVIEW_CHARS, USAGE_OUTPUT_PREVIEW_CHARS, type ModelPrice } from '../constants'

const TOKENS_PER_PRICE_UNIT = 1_000_000

export const EMPTY_USAGE: TokenUsage = { inputTokens: 0, cachedInputTokens: 0, outputTokens: 0 }

export const addUsage = (a: TokenUsage, b: TokenUsage): TokenUsage => ({
  inputTokens: a.inputTokens + b.inputTokens,
  cachedInputTokens: a.cachedInputTokens + b.cachedInputTokens,
  outputTokens: a.outputTokens + b.outputTokens
})

const hasTokens = (usage: TokenUsage): boolean => usage.inputTokens + usage.outputTokens > 0

/** The price of a model, or of the base model for a dated snapshot ("gpt-4o-2024-08-06"). Null if it isn't listed. */
function findPrice(model: string): ModelPrice | null {
  return MODEL_PRICES[model] ?? MODEL_PRICES[model.replace(/-\d{4}-\d{2}-\d{2}$/, '')] ?? null
}

/** Estimates what the tokens cost in US dollars, or null if the model's price isn't known. */
export function estimateCost(model: string, usage: TokenUsage): number | null {
  const price = findPrice(model)
  if (!price) return null
  const uncachedInput = usage.inputTokens - usage.cachedInputTokens
  const dollars =
    uncachedInput * price.input + usage.cachedInputTokens * (price.cachedInput ?? price.input) + usage.outputTokens * price.output
  return dollars / TOKENS_PER_PRICE_UNIT
}

const toUsagePart = (model: string, usage: TokenUsage): UsagePart => ({ model, usage, costUsd: estimateCost(model, usage) })

/** Cuts text to `maxChars`, adding an ellipsis if it was longer. */
const preview = (text: string, maxChars: number): string => {
  const trimmed = text.trim()
  return trimmed.length > maxChars ? `${trimmed.slice(0, maxChars)}…` : trimmed
}

export interface UsageRecordInput {
  source: UsageSource
  model: string
  instruction: string
  presetName: string | null
  text: string
  output: string
  attachmentNames: string[]
  status: UsageStatus
  error: string | null
  chatUsage: TokenUsage | null
  transcription: { model: string; usage: TokenUsage } | null
}

/**
 * Builds the history record for a finished request, or null if there's nothing worth keeping: a request that failed
 * or was cancelled before it cost anything.
 */
export function createUsageRecord(input: UsageRecordInput): UsageRecord | null {
  const transcription = input.transcription && hasTokens(input.transcription.usage) ? input.transcription : null
  if (input.status !== 'done' && !transcription) return null
  return {
    id: randomUUID(),
    createdAt: Date.now(),
    source: input.source,
    model: input.model,
    instruction: input.instruction,
    presetName: input.presetName,
    inputPreview: preview(input.text, USAGE_INPUT_PREVIEW_CHARS),
    outputPreview: preview(input.output, USAGE_OUTPUT_PREVIEW_CHARS),
    attachmentNames: input.attachmentNames,
    status: input.status,
    error: input.error,
    chat: input.chatUsage ? toUsagePart(input.model, input.chatUsage) : null,
    transcription: transcription ? toUsagePart(transcription.model, transcription.usage) : null
  }
}
