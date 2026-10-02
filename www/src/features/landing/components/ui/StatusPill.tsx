import { Check } from 'lucide-react'
import { cn } from '@/utils/cn.util'
import { WaveDots } from './WaveDots'

interface StatusPillProps {
  state: 'working' | 'done'
  className?: string
}

/** The dark pill the quick fix hotkey shows near the bottom of the screen. */
export function StatusPill({ state, className }: StatusPillProps) {
  return (
    <span
      className={cn(
        'inline-flex h-10 animate-pop-in items-center gap-2.5 rounded-full border-2 border-white/85 bg-ink/90 px-4 text-[13px] font-medium text-white shadow-[0_8px_24px_-8px_rgb(0_0_0/0.6)]',
        className
      )}
    >
      {state === 'working' ? (
        <>
          <WaveDots />
          <span className="text-white/80">Fixing</span>
        </>
      ) : (
        <>
          <Check aria-hidden className="size-4 text-lime" strokeWidth={3} />
          <span>Fixed</span>
        </>
      )}
    </span>
  )
}
