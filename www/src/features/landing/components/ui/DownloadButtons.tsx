import { ArrowRight, Download } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { PRIMARY_DOWNLOAD } from '@/constants/download.constants'
import { cn } from '@/utils/cn.util'

interface DownloadButtonsProps {
  secondary?: { label: string; href: string }
  /** Show the platform line under the buttons. */
  showDetails?: boolean
  className?: string
}

/** Download button (to the download page), an optional lime secondary action, and the platform line. */
export function DownloadButtons({ secondary, showDetails = true, className }: DownloadButtonsProps) {
  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <ButtonLink
          href={PRIMARY_DOWNLOAD.href}
          size="lg"
          leadingIcon={<Download aria-hidden className="size-4 transition-transform group-hover:translate-y-0.5" />}
        >
          {PRIMARY_DOWNLOAD.label}
        </ButtonLink>
        {secondary && (
          <ButtonLink
            href={secondary.href}
            variant="accent"
            size="lg"
            trailingIcon={<ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />}
          >
            {secondary.label}
          </ButtonLink>
        )}
      </div>
      {showDetails && <p className="text-sm text-muted">Free · macOS · Apple Silicon and Intel</p>}
    </div>
  )
}
