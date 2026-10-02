import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '../../../components/ui/Button'

interface StepFooterProps {
  onBack?: () => void
  onContinue: () => void
  continueLabel?: string
  loading?: boolean
  disabled?: boolean
}

/** Back and Continue buttons at the bottom of an onboarding step. Back is hidden when there is no `onBack`. */
export function StepFooter({ onBack, onContinue, continueLabel = 'Continue', loading, disabled }: StepFooterProps): React.JSX.Element {
  return (
    <div className="flex items-center justify-between">
      {onBack ? (
        <Button variant="ghost" leadingIcon={<ArrowLeft className="size-4" />} onClick={onBack}>
          Back
        </Button>
      ) : (
        <span />
      )}
      <Button
        variant="primary"
        size="lg"
        loading={loading}
        disabled={disabled}
        trailingIcon={<ArrowRight className="size-4" />}
        onClick={onContinue}
      >
        {continueLabel}
      </Button>
    </div>
  )
}
