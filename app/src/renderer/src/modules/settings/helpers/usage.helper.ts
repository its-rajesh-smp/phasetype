import type { UsagePart, UsageRecord } from '@shared/types'
import type { ModelUsage, UsageDay, UsagePeriod, UsageTotals } from '../types/settings.types'

const DAY_MS = 24 * 60 * 60 * 1000

/** The chat and transcription parts of a request that used tokens. */
const partsOf = (record: UsageRecord): UsagePart[] =>
  [record.chat, record.transcription].filter((part): part is UsagePart => part !== null)

const partTokens = (part: UsagePart): number => part.usage.inputTokens + part.usage.outputTokens

/** Every token a request used: chat and transcription. */
export const recordTokens = (record: UsageRecord): number => partsOf(record).reduce((sum, part) => sum + partTokens(part), 0)

/** What a request cost, or null if any of its models has no known price. */
export function recordCost(record: UsageRecord): number | null {
  const parts = partsOf(record)
  if (parts.some((part) => part.costUsd === null)) return null
  return parts.reduce((sum, part) => sum + (part.costUsd ?? 0), 0)
}

/** Adds up requests, tokens and the known costs. */
export function summarize(records: UsageRecord[]): UsageTotals {
  const parts = records.flatMap(partsOf)
  return {
    requests: records.length,
    tokens: parts.reduce((sum, part) => sum + partTokens(part), 0),
    costUsd: parts.reduce((sum, part) => sum + (part.costUsd ?? 0), 0),
    hasUnpriced: parts.some((part) => part.costUsd === null)
  }
}

/** Today, the last 30 days and all time, measured from `now`. */
export function usagePeriods(now: Date): UsagePeriod[] {
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  return [
    { label: 'Today', since: startOfToday },
    { label: 'Last 30 days', since: now.getTime() - 30 * DAY_MS },
    { label: 'All time', since: 0 }
  ]
}

/** Totals per model (chat and transcription models alike), most expensive first. */
export function summarizeByModel(records: UsageRecord[]): ModelUsage[] {
  const byModel = new Map<string, ModelUsage>()
  records.flatMap(partsOf).forEach((part) => {
    const totals = byModel.get(part.model) ?? { model: part.model, requests: 0, tokens: 0, costUsd: 0, hasUnpriced: false }
    byModel.set(part.model, {
      ...totals,
      requests: totals.requests + 1,
      tokens: totals.tokens + partTokens(part),
      costUsd: totals.costUsd + (part.costUsd ?? 0),
      hasUnpriced: totals.hasUnpriced || part.costUsd === null
    })
  })
  return [...byModel.values()].sort((a, b) => b.costUsd - a.costUsd || b.tokens - a.tokens)
}

/** "Today", "Yesterday", or a short date (with the year if it isn't this year). */
function dayLabel(date: Date, now: Date): string {
  const days = Math.round((new Date(now.toDateString()).getTime() - new Date(date.toDateString()).getTime()) / DAY_MS)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    ...(date.getFullYear() !== now.getFullYear() && { year: 'numeric' })
  })
}

/** Groups records (newest first) by calendar day, keeping their order. */
export function groupByDay(records: UsageRecord[], now: Date): UsageDay[] {
  return records.reduce<UsageDay[]>((days, record) => {
    const date = new Date(record.createdAt)
    const key = date.toDateString()
    const last = days.at(-1)
    if (last?.key === key) last.records.push(record)
    else days.push({ key, label: dayLabel(date, now), records: [record] })
    return days
  }, [])
}
