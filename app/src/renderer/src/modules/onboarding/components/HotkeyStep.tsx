import { useState } from 'react'
import { HotkeyRecorder } from '../../../components/common/HotkeyRecorder'
import { Marker } from '../../../components/ui/Marker'
import { useSettings } from '../../../hooks/useSettings'
import type { OnboardingStepProps } from '../types/onboarding.types'
import { StepFooter } from './StepFooter'
import { StepLayout } from './StepLayout'

/** Onboarding step for choosing the global hotkey. Each change is saved straight away. */
export function HotkeyStep({ onContinue, onBack }: OnboardingStepProps): React.JSX.Element {
  const { settings, update } = useSettings()
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const saveHotkey = async (hotkey: string): Promise<boolean> => {
    setSaving(true)
    setError(null)
    const result = await update({ hotkey })
    setSaving(false)
    if (!result.ok) setError(result.error)
    return result.ok
  }

  const handleContinue = async (): Promise<void> => {
    // Re-check the shortcut is free (the default may already be taken by another app).
    if (settings && (await saveHotkey(settings.hotkey))) onContinue()
  }

  return (
    <StepLayout
      eyebrow="Setup · Hotkey"
      title={
        <>
          Pick your <Marker>hotkey.</Marker>
        </>
      }
      description="Select text in any app and press this shortcut. PhaseType opens right on top, ready to fix or rewrite it."
      footer={<StepFooter onBack={onBack} onContinue={() => void handleContinue()} loading={saving} />}
    >
      {settings && (
        <HotkeyRecorder value={settings.hotkey} error={error} disabled={saving} onChange={(hotkey) => void saveHotkey(hotkey)} />
      )}
    </StepLayout>
  )
}
