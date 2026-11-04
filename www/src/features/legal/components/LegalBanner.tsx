import { Container } from '@/components/ui/Container'
import { PillBadge } from '@/components/ui/PillBadge'

interface LegalBannerProps {
  title: string
  summary: string
  updated: string
}

/** Short hero over the meadow: title, one-line summary and the last-updated date. Holds the page's only h1. */
export function LegalBanner({ title, summary, updated }: LegalBannerProps) {
  return (
    <section aria-labelledby="legal-title" className="pt-16 pb-20 sm:pt-20 sm:pb-24">
      <Container className="flex animate-rise flex-col items-center gap-5 text-center">
        <PillBadge>Updated {updated}</PillBadge>
        <h1
          id="legal-title"
          className="text-[40px] leading-[1] font-normal tracking-[-0.035em] text-balance text-ink sm:text-6xl"
        >
          {title}
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-pretty text-ink/75">{summary}</p>
      </Container>
    </section>
  )
}
