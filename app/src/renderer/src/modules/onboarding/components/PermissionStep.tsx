import { useState } from 'react'
import { AccessibilityStatus } from '../../../components/common/AccessibilityStatus'
import { InlineMessage } from '../../../components/ui/InlineMessage'
import { Marker } from '../../../components/ui/Marker'
import { useSettings } from '../../../hooks/useSettings'
import type { OnboardingStepProps } from '../types/onboarding.types'
import { StepFooter } from './StepFooter'
import { StepLayout } from './StepLayout'

/** Onboarding step asking for macOS Accessibility access. Finishing it marks onboarding as complete. */
export function PermissionStep({ onContinue, onBack }: OnboardingStepProps): React.JSX.Element {
  const { completeOnboarding } = useSettings()
  const [error, setError] = useState<string | null>(null)
  const [finishing, setFinishing] = useState(false)

  const handleFinish = async (): Promise<void> => {
    setFinishing(true)
    setError(null)
    const result = await completeOnboarding()
    setFinishing(false)
    if (result.ok) onContinue()
    else setError(result.error)
  }

  return (
    <StepLayout
      eyebrow="Setup · Access"
      title={
        <>
          Allow <Marker>access.</Marker>
        </>
      }
      description="macOS asks for your OK before an app can copy your selection and paste text back. PhaseType only does that when you press your hotkey."
      footer={<StepFooter onBack={onBack} onContinue={() => void handleFinish()} loading={finishing} continueLabel="Finish setup" />}
    >
      <div className="flex flex-col gap-4">
        <AccessibilityStatus />
        <InlineMessage tone="info">
          In System Settings, turn on PhaseType under Privacy & Security → Accessibility. If it is already on but not detected, switch it off
          and on again.
        </InlineMessage>
        {error && <InlineMessage tone="error">{error}</InlineMessage>}
      </div>
    </StepLayout>
  )
}
