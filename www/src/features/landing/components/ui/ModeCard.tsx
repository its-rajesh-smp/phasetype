import { Check } from 'lucide-react'
import { KeyCombo } from '@/components/ui/KeyCombo'
import { cn } from '@/utils/cn.util'
import type { WritingMode } from '../../types/landing.types'

interface ModeCardProps {
  mode: WritingMode
  visual: React.ReactNode
  tone?: 'paper' | 'ink'
}

/** One of the two ways to use PhaseType, with its hotkey, a visual and key points. */
export function ModeCard({ mode, visual, tone = 'paper' }: ModeCardProps) {
  const isInk = tone === 'ink'

  return (
    <article
      className={cn(
        'flex flex-col gap-8 overflow-hidden rounded-[32px] border p-6 sm:p-9',
        isInk ? 'border-ink bg-ink text-canvas' : 'border-line bg-surface text-ink shadow-card'
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className={cn('text-[11px] font-semibold tracking-[0.2em] uppercase', isInk ? 'text-lime' : 'text-ember')}>
          {mode.name}
        </p>
        <KeyCombo keys={mode.keys} size="md" />
      </div>

      <div className="flex min-h-64 items-center justify-center">{visual}</div>

      <div className="flex flex-col gap-3">
        <h3 className="font-display text-4xl sm:text-5xl">{mode.title}</h3>
        <p className={cn('text-[15px] leading-relaxed', isInk ? 'text-canvas/70' : 'text-muted')}>{mode.description}</p>
      </div>

      <ul className="flex flex-col gap-2.5">
        {mode.points.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-sm">
            <Check aria-hidden className={cn('mt-0.5 size-4 shrink-0', isInk ? 'text-lime' : 'text-success')} strokeWidth={2.5} />
            <span className={isInk ? 'text-canvas/85' : 'text-ink-soft'}>{point}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}
