import type { PublicSettings, Result, SettingsUpdate } from '@shared/types'

export interface SettingsContextValue {
  settings: PublicSettings | null
  update: (patch: SettingsUpdate) => Promise<Result<PublicSettings>>
  completeOnboarding: () => Promise<Result<PublicSettings>>
}
