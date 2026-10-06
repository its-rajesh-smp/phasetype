import { cn } from '@/utils/cn.util'
import { PillBadge } from './PillBadge'

interface SectionHeadingProps {
  id: string
  badge: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'left' | 'center'
  className?: string
}

/** Pill badge, h2 and supporting copy at the top of a section. `id` labels the section. */
export function SectionHeading({ id, badge, title, description, align = 'center', className }: SectionHeadingProps) {
  const isCentered = align === 'center'

  return (
    <div className={cn('flex max-w-2xl flex-col gap-5', isCentered ? 'mx-auto items-center text-center' : 'items-start', className)}>
      <PillBadge>{badge}</PillBadge>
      <h2 id={id} className="text-4xl leading-[1.1] font-medium tracking-[-0.025em] text-balance text-ink sm:text-5xl">
        {title}
      </h2>
      {description && <p className="text-lg leading-relaxed text-pretty text-muted sm:text-xl">{description}</p>}
    </div>
  )
}
