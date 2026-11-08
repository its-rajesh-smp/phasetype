import { Download } from 'lucide-react'
import { DOWNLOAD_OPTIONS } from '@/constants/download.constants'
import { formatReleaseDate, formatSize, parseReleaseNotes } from '../../helpers/release.helper'
import type { Release } from '../../types/release.types'
import { ReleaseNotes } from './ReleaseNotes'

const ARCH_LABEL = Object.fromEntries(DOWNLOAD_OPTIONS.map((option) => [option.arch, option.label]))

interface ReleaseCardProps {
  release: Release
  isLatest: boolean
}

/** One version in the history: number, date, notes and its .dmg files. */
export function ReleaseCard({ release, isLatest }: ReleaseCardProps) {
  return (
    <li className="grid gap-4 rounded-3xl border border-line bg-surface p-6 shadow-card sm:grid-cols-[180px_1fr] sm:p-8">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-medium tracking-[-0.02em] text-ink">v{release.version}</h3>
          {isLatest && <span className="rounded-full bg-lime px-2.5 py-0.5 text-xs font-semibold text-ink">Latest</span>}
        </div>
        <p className="text-sm text-muted">
          <time dateTime={release.publishedAt}>{formatReleaseDate(release.publishedAt)}</time>
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <ReleaseNotes blocks={parseReleaseNotes(release.notes)} />
        {release.assets.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {release.assets.map((asset) => (
              <a
                key={asset.arch}
                href={asset.url}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas px-3 py-1.5 text-[13px] font-medium text-ink transition-colors hover:bg-sunken"
              >
                <Download aria-hidden className="size-3.5" />
                {ARCH_LABEL[asset.arch]} · {formatSize(asset.sizeBytes)}
              </a>
            ))}
          </div>
        )}
      </div>
    </li>
  )
}
