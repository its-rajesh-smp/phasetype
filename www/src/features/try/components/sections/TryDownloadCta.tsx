import { Container } from '@/components/ui/Container'
import { DOWNLOAD_OPTIONS } from '@/constants/download.constants'
import { DownloadButtons } from '@/features/landing/components/ui/DownloadButtons'

/** After trying: the pitch for the real app, which works in every app instead of one text box. */
export function TryDownloadCta() {
  return (
    <section aria-labelledby="try-cta-title" className="reveal py-24 sm:py-28">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2 id="try-cta-title" className="max-w-2xl text-4xl leading-[1.1] font-medium tracking-[-0.025em] text-balance text-ink sm:text-5xl">
          Now do it in every app on your Mac.
        </h2>
        <p className="max-w-xl text-lg leading-relaxed text-pretty text-muted">
          The app works in Mail, Slack, Notes and anywhere else you type, and pastes the result straight back over your selection.
        </p>
        <DownloadButtons options={DOWNLOAD_OPTIONS} className="mt-2" />
      </Container>
    </section>
  )
}
