import { Check } from 'lucide-react'
import { cn } from '../../utils/cn.util'

interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  disabled?: boolean
}

/** Accessible checkbox: an ink box with a lime tick when checked. */
export function Checkbox({ checked, onChange, label, disabled }: CheckboxProps): React.JSX.Element {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'no-drag flex size-[18px] shrink-0 items-center justify-center rounded-[5px] border transition-colors disabled:opacity-40',
        'focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:outline-none',
        checked ? 'border-ink bg-ink text-lime' : 'border-line-strong bg-surface hover:border-ink/40'
      )}
    >
      {checked && <Check className="size-3" strokeWidth={3} />}
    </button>
  )
}
