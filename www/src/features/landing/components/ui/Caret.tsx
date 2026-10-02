import { cn } from '@/utils/cn.util'

/** Blinking text caret shown while something is being typed or streamed. */
export function Caret({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn('ml-0.5 inline-block h-[1.1em] w-[2px] animate-caret bg-ember align-text-bottom', className)} />
  )
}
