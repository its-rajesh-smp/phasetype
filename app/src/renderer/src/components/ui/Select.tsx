import { ChevronDown } from 'lucide-react'
import type { SelectHTMLAttributes } from 'react'
import { cn } from '../../utils/cn.util'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[]
}

/** Styled native dropdown built from a list of string options. */
export function Select({ options, className, ...rest }: SelectProps): React.JSX.Element {
  return (
    <div className={cn('no-drag relative', className)}>
      <select
        className="h-11 w-full appearance-none rounded-xl border border-line-strong bg-surface/80 pr-10 pl-4 text-sm text-ink outline-none focus:border-ink/40 disabled:opacity-50"
        {...rest}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted" />
    </div>
  )
}
