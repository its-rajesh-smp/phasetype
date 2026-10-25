import { QUICK_ACTIONS } from '@shared/constants'
import type { QuickAction } from '@shared/types'
import { QuickActionButton } from './QuickActionButton'

interface QuickActionsProps {
  hasText: boolean
  disabled: boolean
  onRun: (action: QuickAction) => void
}

/** Row of quick action buttons. Actions that need text are disabled when there is nothing to work on. */
export function QuickActions({ hasText, disabled, onRun }: QuickActionsProps): React.JSX.Element {
  return (
    <div className="flex flex-wrap gap-2">
      {QUICK_ACTIONS.map((action) => (
        <QuickActionButton key={action.id} action={action} disabled={disabled || (action.requiresText && !hasText)} onRun={onRun} />
      ))}
    </div>
  )
}
