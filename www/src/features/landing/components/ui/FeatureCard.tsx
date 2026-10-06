import { IconBadge } from '@/components/ui/IconBadge'
import { cn } from '@/utils/cn.util'
import { TONE_CLASSES } from '../../constants/tone.constants'
import type { Feature } from '../../types/landing.types'

interface FeatureCardProps {
  feature: Feature
  visual?: React.ReactNode
}

/** A pastel tile in the features bento. Wide tiles span two columns and can show a visual. */
export function FeatureCard({ feature, visual }: FeatureCardProps) {
  const tone = TONE_CLASSES[feature.tone]

  return (
    <li
      className={cn(
        'flex flex-col gap-6 rounded-[28px] border p-6 sm:p-7',
        tone.card,
        feature.wide && 'lg:col-span-2',
        visual && 'justify-between'
      )}
    >
      <div className="flex flex-col gap-4">
        <IconBadge icon={feature.icon} />
        <div className="flex flex-col gap-2">
          <h3 className={cn('text-2xl leading-tight font-medium tracking-[-0.04em]', tone.title)}>{feature.title}</h3>
          <p className="text-[15px] leading-relaxed text-muted">{feature.description}</p>
        </div>
      </div>
      {visual}
    </li>
  )
}
