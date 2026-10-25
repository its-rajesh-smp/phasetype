import { NEW_PRESET_NAME } from '@shared/constants'
import type { Preset } from '@shared/types'

/** Coerces one preset from the renderer into a valid preset, or null if it has no id. */
function sanitizePreset(value: Partial<Preset>): Preset | null {
  if (typeof value.id !== 'string' || !value.id) return null
  return {
    id: value.id,
    name: (typeof value.name === 'string' && value.name.trim()) || NEW_PRESET_NAME,
    instructions: typeof value.instructions === 'string' ? value.instructions : '',
    about: typeof value.about === 'string' ? value.about : '',
    enabled: value.enabled !== false
  }
}

/** Validates a preset list from the renderer: drops entries without an id or with a duplicate id, and fills in missing fields. */
export function sanitizePresets(value: unknown): Preset[] {
  if (!Array.isArray(value)) return []
  const presets = value.map((item) => sanitizePreset(item as Partial<Preset>)).filter((preset): preset is Preset => preset !== null)
  return presets.filter((preset, index) => presets.findIndex((other) => other.id === preset.id) === index)
}
