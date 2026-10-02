import { useContext } from 'react'
import { SettingsContext } from '../context/SettingsContext'
import type { SettingsContextValue } from '../types'

/** Returns the settings context. Throws if used outside `<SettingsProvider>`. */
export function useSettings(): SettingsContextValue {
  const context = useContext(SettingsContext)
  if (!context) throw new Error('useSettings must be used inside <SettingsProvider>.')
  return context
}
