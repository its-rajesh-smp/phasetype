import { NEW_PRESET_NAME } from '@shared/constants'
import type { Preset, PublicSettings, Result } from '@shared/types'
import { useRef, useState } from 'react'
import { useSettings } from '../../../hooks/useSettings'
import { createId } from '../../../utils/id.util'

/**
 * The saved presets with add, change and remove actions. Changes show straight away and are built
 * on the latest list, so quick edits in a row (typing, then ticking a box) never overwrite each other.
 */
export function usePresets() {
  const { settings, update } = useSettings()
  const [presets, setPresets] = useState<Preset[]>(settings?.presets ?? [])
  const latestRef = useRef(presets)

  const save = (next: Preset[]): Promise<Result<PublicSettings>> => {
    latestRef.current = next
    setPresets(next)
    return update({ presets: next })
  }

  /** Adds an empty preset and returns its id. */
  const add = (): string => {
    const preset: Preset = { id: createId(), name: NEW_PRESET_NAME, instructions: '', about: '', enabled: true }
    void save([...latestRef.current, preset])
    return preset.id
  }

  const change = (id: string, patch: Partial<Omit<Preset, 'id'>>) =>
    save(latestRef.current.map((preset) => (preset.id === id ? { ...preset, ...patch } : preset)))

  const remove = (id: string) => save(latestRef.current.filter((preset) => preset.id !== id))

  return { presets, add, change, remove }
}
