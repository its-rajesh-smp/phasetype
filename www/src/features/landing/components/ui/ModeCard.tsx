import { Check } from 'lucide-react'
import { KeyCombo } from '@/components/ui/KeyCombo'
import { cn } from '@/utils/cn.util'
import type { WritingMode } from '../../types/landing.types'

interface ModeCardProps {
  mode: WritingMode
  visual: React.ReactNode
  tone?: 'light' | 'dark'
}

/** One of the two ways to use PhaseType, with its hotkey, a visual and key points. */
export function ModeCard({ mode, visual, tone = 'light' }: ModeCardProps) {
  const isDark = tone === 'dark'

  return (
    <article
      className={cn(
        'flex flex-col gap-8 overflow-hidden rounded-[28px] border p-6 sm:p-9',
        isDark ? 'border-stage-line bg-stage text-white' : 'border-sky-edge bg-sky-tint text-ink'
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p
          className={cn(
            'rounded-full px-3 py-1 text-[13px] font-semibold',
            isDark ? 'bg-lime text-ink' : 'border border-sky-edge bg-surface text-sky-ink'
          )}
        >
          {mode.name}
        </p>
        <KeyCombo keys={mode.keys} size="md" />
      </div>

      <div className="flex min-h-64 items-center justify-center">{visual}</div>

      <div className="flex flex-col gap-3">
        <h3 className="text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
          <span className={isDark ? 'text-lime' : 'text-sky-ink'}>{mode.titleAccent}</span> {mode.title}
        </h3>
        <p className={cn('text-[15px] leading-relaxed', isDark ? 'text-white/65' : 'text-muted')}>{mode.description}</p>
      </div>

      <ul className="flex flex-col gap-2.5">
        {mode.points.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-sm">
            <Check aria-hidden className={cn('mt-0.5 size-4 shrink-0', isDark ? 'text-lime' : 'text-sky-ink')} strokeWidth={2.5} />
            <span className={isDark ? 'text-white/85' : 'text-ink-soft'}>{point}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}
