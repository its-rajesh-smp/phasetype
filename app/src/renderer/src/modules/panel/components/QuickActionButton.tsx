import type { QuickAction } from '@shared/types'
import { QUICK_ACTION_ICONS } from '../constants/panel.constants'

interface QuickActionButtonProps {
  action: QuickAction
  disabled: boolean
  onRun: (action: QuickAction) => void
}

/** Pill button that runs a predefined instruction such as "Fix the sentence". */
export function QuickActionButton({ action, disabled, onRun }: QuickActionButtonProps): React.JSX.Element {
  const Icon = QUICK_ACTION_ICONS[action.id]
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onRun(action)}
      className="inline-flex h-8 items-center gap-1.5 rounded-full border border-line-strong bg-surface px-3.5 text-[13px] font-medium text-ink-soft transition-colors hover:border-ink/30 hover:bg-lime/30 hover:text-ink disabled:pointer-events-none disabled:opacity-40"
    >
      {Icon && <Icon className="size-3.5 text-ember" />}
      {action.label}
    </button>
  )
}
