import { cn } from '@/utils/cn.util'
import { LogoMark } from './LogoMark'

/** App icon followed by the PhaseType wordmark. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <LogoMark />
      <span className="text-lg leading-none font-semibold tracking-[-0.02em] text-ink">PhaseType</span>
    </span>
  )
}
