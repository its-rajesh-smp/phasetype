import { cn } from '@/utils/cn.util'

/** The tilted lime → ember bar from the app icon, used as a decorative accent. */
export function SlashMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn('pointer-events-none block rotate-[22deg] rounded-full bg-linear-to-b from-lime to-ember', className)}
    />
  )
}
