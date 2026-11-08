import { Download } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { PRIMARY_DOWNLOAD } from '@/constants/download.constants'

interface PanelNoticeProps {
  message: string
  /** Out of free tries: offer the download instead of a retry. */
  isLimit: boolean
}

/** An error inside the panel. When the free tries run out it points to the download. */
export function PanelNotice({ message, isLimit }: PanelNoticeProps) {
  if (!isLimit) {
    return (
      <p role="alert" className="mx-4 mt-3 rounded-xl border border-peach-edge bg-peach-tint px-4 py-3 text-[13px] leading-relaxed text-peach-ink">
        {message}
      </p>
    )
  }

  return (
    <div role="alert" className="mx-4 mt-3 flex flex-col items-start gap-3 rounded-xl border border-mint-edge bg-mint-tint px-4 py-4">
      <p className="text-[13px] leading-relaxed text-ink-soft">{message}</p>
      <ButtonLink href={PRIMARY_DOWNLOAD.href} size="sm" leadingIcon={<Download aria-hidden className="size-3.5" />}>
        {PRIMARY_DOWNLOAD.label}
      </ButtonLink>
    </div>
  )
}
