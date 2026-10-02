import { cn } from '@/utils/cn.util'
import { Eyebrow } from './Eyebrow'

interface SectionHeadingProps {
  id: string
  eyebrow: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'left' | 'center'
  tone?: 'ink' | 'paper'
  className?: string
}

/** Eyebrow, serif h2 and supporting copy at the top of a section. `id` labels the section. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'ink',
  className
}: SectionHeadingProps) {
  const isCentered = align === 'center'

  return (
    <div className={cn('flex max-w-2xl flex-col gap-5', isCentered && 'mx-auto items-center text-center', className)}>
      <Eyebrow withRule={!isCentered} className={cn(tone === 'paper' && 'text-canvas/60')}>
        {eyebrow}
      </Eyebrow>
      <h2
        id={id}
        className={cn(
          'font-display text-[44px] leading-[0.95] tracking-[-0.015em] text-balance sm:text-6xl',
          tone === 'ink' ? 'text-ink' : 'text-canvas'
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn('text-[17px] leading-relaxed text-pretty', tone === 'ink' ? 'text-muted' : 'text-canvas/70')}>
          {description}
        </p>
      )}
    </div>
  )
}
