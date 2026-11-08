import { Marker } from '@/components/ui/Marker'
import { PillBadge } from '@/components/ui/PillBadge'
import { formatReleaseDate } from '../../helpers/release.helper'
import type { Release } from '../../types/release.types'

/** Title and the latest version. Holds the page's only h1. */
export function DownloadHero({ latest }: { latest?: Release }) {
  return (
    <div className="mx-auto flex max-w-3xl animate-rise flex-col items-center gap-6 text-center">
      {latest && (
        <PillBadge>
          v{latest.version} · {formatReleaseDate(latest.publishedAt)}
        </PillBadge>
      )}
      <h1 className="text-[40px] leading-[1.02] font-normal tracking-[-0.035em] text-balance text-ink sm:text-6xl">
        Get PhaseType <Marker>for your Mac</Marker>.
      </h1>
      <p className="max-w-2xl text-lg leading-relaxed text-pretty text-ink/75 sm:text-xl">
        Free for macOS on Apple Silicon and Intel. Pick whichever install suits you.
      </p>
    </div>
  )
}
