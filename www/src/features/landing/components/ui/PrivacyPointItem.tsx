import { IconBadge } from '@/components/ui/IconBadge'
import type { PrivacyPoint } from '../../types/landing.types'

/** One privacy guarantee, as a frosted row on the sky card. */
export function PrivacyPointItem({ point }: { point: PrivacyPoint }) {
  return (
    <li className="flex gap-4 rounded-2xl border border-white/70 bg-white/75 p-4 backdrop-blur">
      <IconBadge icon={point.icon} tone="ink" />
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-ink">{point.title}</h3>
        <p className="text-sm leading-relaxed text-muted">{point.description}</p>
      </div>
    </li>
  )
}
