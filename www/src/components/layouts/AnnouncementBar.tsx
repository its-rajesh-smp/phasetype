import { ArrowRight } from 'lucide-react'
import { PRIMARY_DOWNLOAD } from '@/constants/download.constants'
import { SITE } from '@/constants/site.constants'

/** Thin ink bar above the header announcing the current release, with a direct download link. */
export function AnnouncementBar() {
  return (
    <div className="bg-ink text-canvas">
      <a
        href={PRIMARY_DOWNLOAD.href}
        className="group mx-auto flex h-10 max-w-6xl items-center justify-center gap-2.5 px-4 text-[13px]"
      >
        <span className="rounded-full bg-lime px-2 py-0.5 text-[11px] font-semibold text-ink">New</span>
        <span className="truncate text-canvas/80">
          {SITE.name} {SITE.version} for macOS is out.
          <span className="hidden sm:inline"> Bring your own OpenAI key.</span>
        </span>
        <span className="inline-flex items-center gap-1 font-medium text-lime">
          Download
          <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </a>
    </div>
  )
}
