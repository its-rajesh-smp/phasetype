import { cn } from '../../utils/cn.util'

interface KbdProps {
  children: React.ReactNode
  size?: 'sm' | 'lg'
  className?: string
}

/** A single keyboard key cap. */
export function Kbd({ children, size = 'sm', className }: KbdProps): React.JSX.Element {
  return (
    <kbd
      className={cn(
        'inline-flex items-center justify-center rounded-md border border-line-strong bg-surface font-sans font-medium text-ink-soft',
        'shadow-[0_1px_0_var(--color-line-strong)]',
        size === 'sm' ? 'h-5 min-w-5 px-1 text-[11px]' : 'h-12 min-w-12 rounded-xl px-3.5 text-xl shadow-[0_2px_0_var(--color-line-strong)]',
        className
      )}
    >
      {children}
    </kbd>
  )
}
