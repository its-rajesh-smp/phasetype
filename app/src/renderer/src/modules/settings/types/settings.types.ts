export type SettingsTabId = 'general' | 'hotkeys' | 'presets'

/** The editable text fields of a preset. */
export interface PresetDraft {
  name: string
  instructions: string
  about: string
}
