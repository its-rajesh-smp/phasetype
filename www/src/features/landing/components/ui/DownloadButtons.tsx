import { Download } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import type { DownloadOption } from '@/types/download.types'
import { cn } from '@/utils/cn.util'

interface DownloadButtonsProps {
  options: DownloadOption[]
  tone?: 'paper' | 'ink'
  align?: 'left' | 'center'
  className?: string
}

/** The primary download button plus a secondary one for the other Mac architecture. */
export function DownloadButtons({ options, tone = 'paper', align = 'center', className }: DownloadButtonsProps) {
  const [primary, ...others] = options

  return (
    <div className={cn('flex flex-col gap-3', align === 'center' ? 'items-center' : 'items-start', className)}>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <ButtonLink
          href={primary.href}
          variant="accent"
          size="lg"
          aria-label={`${primary.label}, ${primary.detail}`}
          leadingIcon={<Download aria-hidden className="size-4 transition-transform group-hover:translate-y-0.5" />}
        >
          {primary.label}
        </ButtonLink>
        {others.map((option) => (
          <ButtonLink
            key={option.arch}
            href={option.href}
            variant={tone === 'paper' ? 'secondary' : 'inverse'}
            size="lg"
            aria-label={`Download for ${option.label}`}
          >
            {option.label}
          </ButtonLink>
        ))}
      </div>
      <p className={cn('text-[13px]', tone === 'paper' ? 'text-muted' : 'text-canvas/60')}>
        macOS · {primary.detail} · Bring your own OpenAI key
      </p>
    </div>
  )
}
