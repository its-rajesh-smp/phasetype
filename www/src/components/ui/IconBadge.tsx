import type { LucideIcon } from 'lucide-react'
import { cn } from '@/utils/cn.util'

interface IconBadgeProps {
  icon: LucideIcon
  tone?: 'paper' | 'lime' | 'ink'
  className?: string
}

const TONE_CLASSES = {
  paper: 'border border-line bg-canvas text-ink',
  lime: 'bg-lime text-ink',
  ink: 'bg-ink text-lime'
} as const

/** A rounded square holding a single icon. */
export function IconBadge({ icon: Icon, tone = 'paper', className }: IconBadgeProps) {
  return (
    <span className={cn('inline-flex size-10 shrink-0 items-center justify-center rounded-xl', TONE_CLASSES[tone], className)}>
      <Icon aria-hidden className="size-[18px]" strokeWidth={1.8} />
    </span>
  )
}
