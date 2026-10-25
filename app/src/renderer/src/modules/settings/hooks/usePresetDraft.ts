import type { Preset } from '@shared/types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { PRESET_AUTOSAVE_DELAY_MS } from '../../../constants'
import { useLatestRef } from '../../../hooks/useLatestRef'
import { useTransientFlag } from '../../../hooks/useTransientFlag'
import type { PresetDraft } from '../types/settings.types'

/**
 * Local copy of a preset's text fields that saves itself shortly after typing stops,
 * and straight away on `flush` (e.g. on blur) or when the editor closes.
 */
export function usePresetDraft(preset: Preset, onSave: (draft: PresetDraft) => Promise<{ ok: boolean }>) {
  const [draft, setDraft] = useState<PresetDraft>({ name: preset.name, instructions: preset.instructions, about: preset.about })
  const [saved, flashSaved] = useTransientFlag()
  const pendingRef = useRef<PresetDraft | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const onSaveRef = useLatestRef(onSave)

  const flush = useCallback(() => {
    clearTimeout(timeoutRef.current)
    const pending = pendingRef.current
    if (!pending) return
    pendingRef.current = null
    void onSaveRef.current(pending).then((result) => result.ok && flashSaved())
  }, [onSaveRef, flashSaved])

  const change = (field: keyof PresetDraft, value: string): void => {
    const next = { ...draft, [field]: value }
    setDraft(next)
    pendingRef.current = next
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(flush, PRESET_AUTOSAVE_DELAY_MS)
  }

  useEffect(() => flush, [flush])

  return { draft, change, flush, saved }
}
