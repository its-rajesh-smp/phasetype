import type { InputHTMLAttributes, ReactNode, Ref } from 'react'
import { cn } from '../../utils/cn.util'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean
  trailing?: ReactNode
  ref?: Ref<HTMLInputElement>
}

/** Styled single-line input with an optional trailing element (e.g. a button) and invalid state. */
export function TextInput({ invalid, trailing, className, ref, ...rest }: TextInputProps): React.JSX.Element {
  return (
    <div
      className={cn(
        'no-drag flex h-12 items-center gap-2 rounded-xl border bg-surface/80 px-4 transition-colors',
        'focus-within:border-ink/40 focus-within:bg-surface',
        invalid ? 'border-danger/60' : 'border-line-strong',
        className
      )}
    >
      <input
        ref={ref}
        className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-subtle"
        spellCheck={false}
        autoComplete="off"
        {...rest}
      />
      {trailing}
    </div>
  )
}
