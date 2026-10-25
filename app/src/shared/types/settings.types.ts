import type { AiProviderId } from './ai.types'
import type { Preset } from './preset.types'

export interface AppSettings {
  provider: AiProviderId
  model: string
  /** Opens the panel. */
  hotkey: string
  /** Fixes the selection in place, without opening the panel. */
  quickFixHotkey: string
  systemPrompt: string
  presets: Preset[]
  launchAtLogin: boolean
  onboarded: boolean
}

/** Settings as seen by the renderer. The raw API key never leaves the main process. */
export interface PublicSettings extends AppSettings {
  hasApiKey: boolean
  apiKeyHint: string | null
}

export type SettingsUpdate = Partial<Omit<AppSettings, 'onboarded'>> & { apiKey?: string }

/** Settings that hold a global shortcut. */
export type HotkeySettingKey = 'hotkey' | 'quickFixHotkey'
