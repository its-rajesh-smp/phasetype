import { cn } from '@/utils/cn.util'

/** Small rounded label above a section title. */
export function PillBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-[13px] font-medium text-ink-soft shadow-card',
        className
      )}
    >
      {children}
    </p>
  )
}
