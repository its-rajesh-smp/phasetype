import type { UsageRecord } from '@shared/types'

export type SettingsTabId = 'general' | 'hotkeys' | 'presets' | 'usage'

/** The editable text fields of a preset. */
export interface PresetDraft {
  name: string
  instructions: string
  about: string
}

/** Requests, tokens and estimated cost over some set of requests. */
export interface UsageTotals {
  requests: number
  tokens: number
  /** The cost of every request whose model has a known price. */
  costUsd: number
  /** True if some requests used a model without a known price, so `costUsd` leaves them out. */
  hasUnpriced: boolean
}

/** A span of time the usage summary covers. */
export interface UsagePeriod {
  label: string
  /** Earliest request time included, in milliseconds since the epoch. */
  since: number
}

export interface ModelUsage extends UsageTotals {
  model: string
}

/** The requests made on one calendar day. */
export interface UsageDay {
  key: string
  label: string
  records: UsageRecord[]
}
