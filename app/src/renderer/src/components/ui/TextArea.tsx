import type { Ref, TextareaHTMLAttributes } from 'react'
import { cn } from '../../utils/cn.util'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: Ref<HTMLTextAreaElement>
}

/** Styled multi-line text input. */
export function TextArea({ className, ref, ...rest }: TextAreaProps): React.JSX.Element {
  return (
    <textarea
      ref={ref}
      className={cn(
        'no-drag w-full resize-none rounded-xl border border-line-strong bg-surface/80 px-4 py-3 text-sm leading-relaxed text-ink outline-none',
        'transition-colors placeholder:text-subtle focus:border-ink/40 focus:bg-surface',
        className
      )}
      {...rest}
    />
  )
}
