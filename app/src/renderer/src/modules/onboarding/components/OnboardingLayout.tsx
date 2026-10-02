import { Logo } from '../../../components/ui/Logo'
import { StepIndicator } from './StepIndicator'

interface OnboardingLayoutProps {
  stepNumber: number
  totalSteps: number
  showSteps: boolean
  children: React.ReactNode
}

/** Onboarding page frame: draggable header with the logo and step progress, plus a scrollable content area. */
export function OnboardingLayout({ stepNumber, totalSteps, showSteps, children }: OnboardingLayoutProps): React.JSX.Element {
  return (
    <div className="flex h-full flex-col">
      <header className="drag-region flex h-14 shrink-0 items-center justify-between pr-6 pl-22">
        <Logo />
        {showSteps && <StepIndicator current={stepNumber} total={totalSteps} />}
      </header>
      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto px-10 pt-10 pb-8">{children}</main>
    </div>
  )
}
