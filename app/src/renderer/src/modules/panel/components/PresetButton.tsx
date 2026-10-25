import type { PresetSummary } from '@shared/types'
import { CircleUserRound } from 'lucide-react'
import { KeyCombo } from '../../../components/ui/KeyCombo'
import { PRESET_PICKER_SHORTCUT } from '../../../constants'
import { cn } from '../../../utils/cn.util'

interface PresetButtonProps {
  preset: PresetSummary | null
  open: boolean
  disabled: boolean
  onClick: () => void
}

/** Pill showing the active preset (or "Preset"); opens the preset menu. Tinted lime while a preset is active. */
export function PresetButton({ preset, open, disabled, onClick }: PresetButtonProps): React.JSX.Element {
  return (
    <button
      type="button"
      aria-haspopup="menu"
      aria-expanded={open}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'ml-auto inline-flex h-8 max-w-56 shrink-0 items-center gap-1.5 rounded-full border pr-1.5 pl-3 text-[13px] font-medium transition-colors',
        'disabled:pointer-events-none disabled:opacity-40',
        preset ? 'border-lime-deep bg-lime/35 text-ink hover:bg-lime/55' : 'border-line-strong bg-surface text-ink-soft hover:border-ink/30 hover:text-ink'
      )}
    >
      <CircleUserRound className={cn('size-3.5 shrink-0', preset ? 'text-ink' : 'text-ember')} />
      <span className="truncate">{preset?.name ?? 'Preset'}</span>
      <KeyCombo accelerator={PRESET_PICKER_SHORTCUT} className="ml-0.5" />
    </button>
  )
}
