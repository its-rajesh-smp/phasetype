import Image from 'next/image'
import { IconBadge } from '@/components/ui/IconBadge'
import { cn } from '@/utils/cn.util'
import { TONE_CLASSES } from '../../constants/tone.constants'
import type { Feature } from '../../types/landing.types'

interface FeatureCardProps {
  feature: Feature
  visual?: React.ReactNode
}

/** A pastel tile in the features bento. Wide tiles span two columns and can show a visual; plain tiles can show a nature image. */
export function FeatureCard({ feature, visual }: FeatureCardProps) {
  const tone = TONE_CLASSES[feature.tone]

  return (
    <li
      className={cn(
        'group relative flex flex-col gap-6 overflow-hidden rounded-[28px] border p-6 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-float sm:p-7',
        tone.card,
        feature.image && 'min-h-[440px]',
        feature.wide && 'lg:col-span-2',
        visual && 'justify-between'
      )}
    >
      {feature.image && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <Image
            src={feature.image}
            alt=""
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 290px, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-bottom transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-x-0 top-0 h-2/3 bg-linear-to-b from-surface via-surface/90 to-transparent" />
        </div>
      )}
      <div className="relative flex flex-col gap-4">
        <IconBadge
          icon={feature.icon}
          className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:-rotate-6 group-hover:scale-110"
        />
        <div className="flex flex-col gap-2">
          <h3 className={cn('text-2xl leading-tight font-medium tracking-[-0.04em]', tone.title)}>{feature.title}</h3>
          <p className="text-[15px] leading-relaxed text-muted">{feature.description}</p>
        </div>
      </div>
      {visual}
    </li>
  )
}
