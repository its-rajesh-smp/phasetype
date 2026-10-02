import { ApiKeyStep } from './components/ApiKeyStep'
import { DoneStep } from './components/DoneStep'
import { HotkeyStep } from './components/HotkeyStep'
import { OnboardingLayout } from './components/OnboardingLayout'
import { PermissionStep } from './components/PermissionStep'
import { useOnboardingSteps } from './hooks/useOnboardingSteps'

/** First-run setup flow: API key, hotkey and permission steps, then a final "all set" screen. */
export function OnboardingView(): React.JSX.Element {
  const { stage, stepNumber, totalSteps, next, back } = useOnboardingSteps()

  return (
    <OnboardingLayout stepNumber={stepNumber} totalSteps={totalSteps} showSteps={stage !== 'done'}>
      {stage === 'apiKey' && <ApiKeyStep onContinue={next} />}
      {stage === 'hotkey' && <HotkeyStep onContinue={next} onBack={back} />}
      {stage === 'permission' && <PermissionStep onContinue={next} onBack={back} />}
      {stage === 'done' && <DoneStep />}
    </OnboardingLayout>
  )
}
