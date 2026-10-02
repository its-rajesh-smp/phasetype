import { cn } from '@/utils/cn.util'
import { LogoMark } from './LogoMark'

interface LogoProps {
  className?: string
  tone?: 'ink' | 'paper'
}

/** App icon followed by the PhaseType wordmark. */
export function Logo({ className, tone = 'ink' }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <LogoMark className={cn(tone === 'paper' && 'rounded-[7px] ring-1 ring-canvas/20')} />
      <span className={cn('text-[17px] font-bold tracking-[-0.02em]', tone === 'ink' ? 'text-ink' : 'text-canvas')}>
        PhaseType
      </span>
    </span>
  )
}
