import type { Preset, PresetSummary } from '../types'

/** The presets the panel can offer: enabled ones, by id and name. */
export const listEnabledPresets = (presets: Preset[]): PresetSummary[] =>
  presets.filter((preset) => preset.enabled).map(({ id, name }) => ({ id, name }))
