import { ArrowDown, Download } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import type { DownloadOption } from '@/types/download.types'
import { cn } from '@/utils/cn.util'

interface DownloadButtonsProps {
  options: DownloadOption[]
  secondary?: { label: string; href: string }
  /** Show the platform line and the link for the other Mac architecture. */
  showDetails?: boolean
  className?: string
}

/** Primary download button, an optional lime secondary action, and a link for the other Mac architecture. */
export function DownloadButtons({ options, secondary, showDetails = true, className }: DownloadButtonsProps) {
  const [primary, ...others] = options

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <ButtonLink
          href={primary.href}
          size="lg"
          aria-label={`${primary.label}, ${primary.detail}`}
          leadingIcon={<Download aria-hidden className="size-4 transition-transform group-hover:translate-y-0.5" />}
        >
          {primary.label}
        </ButtonLink>
        {secondary && (
          <ButtonLink
            href={secondary.href}
            variant="accent"
            size="lg"
            trailingIcon={<ArrowDown aria-hidden className="size-4 transition-transform group-hover:translate-y-0.5" />}
          >
            {secondary.label}
          </ButtonLink>
        )}
      </div>
      {showDetails && (
        <p className="text-sm text-muted">
          macOS · {primary.detail}
          {others.map((option) => (
            <span key={option.arch}>
              {' · '}
              <a href={option.href} className="font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
                Download for {option.label}
              </a>
            </span>
          ))}
        </p>
      )}
    </div>
  )
}
