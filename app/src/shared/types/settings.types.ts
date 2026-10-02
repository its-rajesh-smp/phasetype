import type { AiProviderId } from './ai.types'

export interface AppSettings {
  provider: AiProviderId
  model: string
  hotkey: string
  systemPrompt: string
  launchAtLogin: boolean
  onboarded: boolean
}

/** Settings as seen by the renderer. The raw API key never leaves the main process. */
export interface PublicSettings extends AppSettings {
  hasApiKey: boolean
  apiKeyHint: string | null
}

export type SettingsUpdate = Partial<Omit<AppSettings, 'onboarded'>> & { apiKey?: string }
