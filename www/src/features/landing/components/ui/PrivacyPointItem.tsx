import { IconBadge } from '@/components/ui/IconBadge'
import type { PrivacyPoint } from '../../types/landing.types'

/** One privacy guarantee, on the dark privacy panel. */
export function PrivacyPointItem({ point }: { point: PrivacyPoint }) {
  return (
    <li className="flex gap-4">
      <IconBadge icon={point.icon} tone="lime" />
      <div className="flex flex-col gap-1.5">
        <h3 className="text-base font-semibold text-canvas">{point.title}</h3>
        <p className="text-[15px] leading-relaxed text-canvas/65">{point.description}</p>
      </div>
    </li>
  )
}
