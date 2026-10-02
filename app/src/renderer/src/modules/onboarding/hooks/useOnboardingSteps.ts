import { useCallback, useState } from 'react'
import { ONBOARDING_STEPS } from '../constants/onboarding.constants'
import type { OnboardingStage } from '../types/onboarding.types'

/** Tracks the current onboarding stage and provides next/back navigation, ending at 'done'. */
export function useOnboardingSteps() {
  const [stage, setStage] = useState<OnboardingStage>(ONBOARDING_STEPS[0])
  const index = stage === 'done' ? ONBOARDING_STEPS.length : ONBOARDING_STEPS.indexOf(stage)

  const next = useCallback(() => {
    setStage(ONBOARDING_STEPS[index + 1] ?? 'done')
  }, [index])

  const back = useCallback(() => {
    if (index > 0) setStage(ONBOARDING_STEPS[index - 1])
  }, [index])

  return { stage, stepNumber: index + 1, totalSteps: ONBOARDING_STEPS.length, next, back }
}
