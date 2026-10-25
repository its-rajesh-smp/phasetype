import type { PresetSummary } from './preset.types'

export interface PanelContext {
  selectedText: string
  accessibilityGranted: boolean
  /** True while the selection is still being read; the panel is shown but not focused yet. */
  capturing: boolean
  /** Enabled presets the user can pick from. */
  presets: PresetSummary[]
}
