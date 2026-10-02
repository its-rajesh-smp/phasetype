import { useState } from 'react'
import { OnboardingView } from '../modules/onboarding/OnboardingView'
import { SettingsView } from '../modules/settings/SettingsView'

/**
 * Shows onboarding or settings. Decides once per window, so finishing onboarding shows the
 * "all set" screen instead of jumping to settings.
 */
export function MainWindowContent({ startWithOnboarding }: { startWithOnboarding: boolean }): React.JSX.Element {
  const [showOnboarding] = useState(startWithOnboarding)
  return showOnboarding ? <OnboardingView /> : <SettingsView />
}
