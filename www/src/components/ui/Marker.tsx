import { cn } from '@/utils/cn.util'

/** Highlights words with a lime background. */
export function Marker({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn('marker', className)}>{children}</span>
}
