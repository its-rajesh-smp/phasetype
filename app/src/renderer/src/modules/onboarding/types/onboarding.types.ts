export type OnboardingStepId = 'apiKey' | 'hotkey' | 'permission'

export type OnboardingStage = OnboardingStepId | 'done'

export interface OnboardingStepProps {
  onContinue: () => void
  onBack?: () => void
}
