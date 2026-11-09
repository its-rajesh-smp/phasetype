'use client'

import { Download } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { DOWNLOAD_OPTIONS } from '@/constants/download.constants'
import { useMacArch } from '../hooks/useMacArch'

const linkClass = 'font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink'

/** One download button for the visitor's Mac (Apple Silicon until detected otherwise), with a link to the other build. */
export function DmgDownload() {
  const arch = useMacArch()
  const primary = DOWNLOAD_OPTIONS.find((option) => option.arch === arch) ?? DOWNLOAD_OPTIONS[0]
  const other = DOWNLOAD_OPTIONS.find((option) => option !== primary) ?? DOWNLOAD_OPTIONS[1]

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <ButtonLink
          href={primary.href}
          aria-label={`Download PhaseType for ${primary.label} Macs, ${primary.detail}`}
          leadingIcon={<Download aria-hidden className="size-4 transition-transform group-hover:translate-y-0.5" />}
        >
          Download for {primary.label}
        </ButtonLink>
      </div>
      <p className="text-[13px] text-muted">
        On {other.arch === 'x64' ? 'an' : 'a'} {other.label} Mac?{' '}
        <a href={other.href} className={linkClass}>
          Download for {other.label}
        </a>
        .
      </p>
    </>
  )
}
