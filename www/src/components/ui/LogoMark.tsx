import { useId } from 'react'
import { cn } from '@/utils/cn.util'

/** The PhaseType app icon (ink tile with the lime → ember slash), drawn inline so it stays crisp. */
export function LogoMark({ className }: { className?: string }) {
  const gradientId = useId()

  return (
    <svg viewBox="100 100 824 824" aria-hidden className={cn('size-7 shrink-0', className)}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e3f542" />
          <stop offset="1" stopColor="#cf7428" />
        </linearGradient>
      </defs>
      <rect x="100" y="100" width="824" height="824" rx="185.4" fill="#16130f" />
      <rect
        x="438.3"
        y="256"
        width="147.4"
        height="512"
        rx="18.4"
        fill={`url(#${gradientId})`}
        transform="rotate(22 512 512)"
      />
    </svg>
  )
}
