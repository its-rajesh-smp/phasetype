import { cn } from '../../utils/cn.util'

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  disabled?: boolean
}

/** Accessible on/off switch. */
export function Toggle({ checked, onChange, label, disabled }: ToggleProps): React.JSX.Element {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'no-drag relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors disabled:opacity-40',
        checked ? 'border-ink bg-ink' : 'border-line-strong bg-sunken'
      )}
    >
      <span
        className={cn(
          'inline-block size-[18px] rounded-full shadow-sm transition-transform',
          checked ? 'translate-x-[22px] bg-lime' : 'translate-x-[2px] bg-surface'
        )}
      />
    </button>
  )
}
