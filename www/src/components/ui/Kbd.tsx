import { cn } from '@/utils/cn.util'

interface KbdProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  pressed?: boolean
  className?: string
}

const SIZE_CLASSES = {
  sm: 'h-5 min-w-5 rounded-md px-1 text-[11px]',
  md: 'h-8 min-w-8 rounded-lg px-2 text-sm',
  lg: 'h-14 min-w-14 rounded-2xl px-4 text-2xl'
} as const

/** A single keyboard key cap. */
export function Kbd({ children, size = 'sm', pressed = false, className }: KbdProps) {
  return (
    <kbd
      className={cn(
        'inline-flex items-center justify-center border border-line-strong bg-surface font-sans font-medium text-ink-soft shadow-key',
        SIZE_CLASSES[size],
        pressed && 'animate-key-press',
        className
      )}
    >
      {children}
    </kbd>
  )
}
