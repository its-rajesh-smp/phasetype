import type { PublicSettings, SettingsUpdate } from '@shared/types'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { SettingsContext } from '../context/SettingsContext'
import { bridge } from '../services/bridge.service'

/** Loads settings from the main process and provides them, plus update/completeOnboarding actions, via context. */
export function SettingsProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [settings, setSettings] = useState<PublicSettings | null>(null)

  useEffect(() => {
    void bridge.settings.get().then(setSettings)
  }, [])

  const update = useCallback(async (patch: SettingsUpdate) => {
    const result = await bridge.settings.update(patch)
    if (result.ok) setSettings(result.data)
    return result
  }, [])

  const completeOnboarding = useCallback(async () => {
    const result = await bridge.settings.completeOnboarding()
    if (result.ok) setSettings(result.data)
    return result
  }, [])

  const value = useMemo(() => ({ settings, update, completeOnboarding }), [settings, update, completeOnboarding])

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}
