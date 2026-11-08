import type { Metadata } from 'next'
import { SiteFooter } from '@/components/layouts/SiteFooter'
import { SiteHeader } from '@/components/layouts/SiteHeader'
import { Container } from '@/components/ui/Container'
import { Playground } from '@/features/try/components/playground/Playground'
import { TryDownloadCta } from '@/features/try/components/sections/TryDownloadCta'
import { TryHero } from '@/features/try/components/sections/TryHero'

const TITLE = 'Try PhaseType in your browser'
const DESCRIPTION = 'Select some text, open PhaseType and rewrite it with AI, right in your browser. No download or sign-up.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/try' },
  openGraph: { url: '/try', title: TITLE, description: DESCRIPTION }
}

export default function TryPage() {
  return (
    <>
      <div className="relative flow-root">
        <SiteHeader />
        <main id="main" className="relative">
          <section aria-label="Playground" className="pt-16 sm:pt-24">
            <Container className="flex flex-col gap-12">
              <TryHero />
              <div className="animate-rise [animation-delay:150ms]">
                <Playground />
              </div>
            </Container>
          </section>
          <TryDownloadCta />
        </main>
      </div>
      <SiteFooter />
    </>
  )
}
