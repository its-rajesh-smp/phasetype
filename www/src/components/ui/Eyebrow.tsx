import { cn } from '@/utils/cn.util'

interface EyebrowProps {
  children: React.ReactNode
  withRule?: boolean
  className?: string
}

/** Small uppercase label with letter spacing, optionally led by a short rule. */
export function Eyebrow({ children, withRule = false, className }: EyebrowProps) {
  return (
    <p className={cn('flex items-center gap-3 text-[11px] font-semibold tracking-[0.2em] text-muted uppercase', className)}>
      {withRule && <span aria-hidden className="h-px w-7 bg-current opacity-60" />}
      {children}
    </p>
  )
}
