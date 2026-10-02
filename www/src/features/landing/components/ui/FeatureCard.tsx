import { IconBadge } from '@/components/ui/IconBadge'
import { cn } from '@/utils/cn.util'
import type { Feature } from '../../types/landing.types'

/** A feature tile in the bento grid. Wide tiles span two columns on large screens. */
export function FeatureCard({ feature, highlighted = false }: { feature: Feature; highlighted?: boolean }) {
  return (
    <li
      className={cn(
        'flex flex-col gap-5 rounded-3xl border p-6 transition-colors duration-300',
        feature.wide && 'lg:col-span-2',
        highlighted ? 'border-lime-deep bg-lime' : 'border-line bg-surface hover:border-line-strong'
      )}
    >
      <IconBadge icon={feature.icon} tone={highlighted ? 'ink' : 'paper'} />
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink">{feature.title}</h3>
        <p className={cn('text-[15px] leading-relaxed', highlighted ? 'text-ink-soft' : 'text-muted')}>{feature.description}</p>
      </div>
    </li>
  )
}
