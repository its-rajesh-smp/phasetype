import { cn } from '@/utils/cn.util'

/** Highlights words with the lime → ember marker stroke. */
export function Marker({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn('marker box-decoration-clone px-1', className)}>{children}</span>
}
