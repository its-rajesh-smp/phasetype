import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { RELEASES_URL } from '@/constants/download.constants'
import type { Release } from '../../types/release.types'
import { ReleaseCard } from '../ui/ReleaseCard'

/** Every published version with its notes and files, newest first. */
export function ReleaseHistory({ releases }: { releases: Release[] }) {
  return (
    <section id="releases" aria-labelledby="releases-title" className="reveal scroll-mt-24 py-20 sm:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading id="releases-title" badge="Changelog" title="All versions" description="What changed in each release." />
        {releases.length ? (
          <ol className="flex flex-col gap-4">
            {releases.map((release, index) => (
              <ReleaseCard key={release.tag} release={release} isLatest={index === 0} />
            ))}
          </ol>
        ) : (
          <p className="text-center text-[15px] text-muted">
            The version list couldn’t be loaded right now. See it on{' '}
            <a href={RELEASES_URL} className="font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
              GitHub
            </a>
            .
          </p>
        )}
      </Container>
    </section>
  )
}
