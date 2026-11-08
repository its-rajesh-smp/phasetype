import type { Metadata } from 'next'
import { SiteFooter } from '@/components/layouts/SiteFooter'
import { SiteHeader } from '@/components/layouts/SiteHeader'
import { Container } from '@/components/ui/Container'
import { DownloadHero } from '@/features/download/components/sections/DownloadHero'
import { InstallOptions } from '@/features/download/components/sections/InstallOptions'
import { OpenAnywaySection } from '@/features/download/components/sections/OpenAnywaySection'
import { ReleaseHistory } from '@/features/download/components/sections/ReleaseHistory'
import { UpdatesSection } from '@/features/download/components/sections/UpdatesSection'
import { getReleases } from '@/features/download/services/getReleases.service'

const TITLE = 'Download PhaseType for Mac'
const DESCRIPTION = 'Install PhaseType with one Terminal command or download the .dmg. Free for Apple Silicon and Intel Macs.'

/** Rebuild the page at most hourly so new releases show up without a redeploy. Keep in sync with RELEASES_REVALIDATE_SECONDS. */
export const revalidate = 3600

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/download' },
  openGraph: { url: '/download', title: TITLE, description: DESCRIPTION }
}

export default async function DownloadPage() {
  const releases = await getReleases()

  return (
    <>
      <div className="relative flow-root">
        <SiteHeader />
        <main id="main" className="relative">
          <section aria-label="Install" className="pt-16 sm:pt-24">
            <Container className="flex flex-col gap-12">
              <DownloadHero latest={releases[0]} />
              <InstallOptions />
            </Container>
          </section>
          <OpenAnywaySection />
          <UpdatesSection />
          <ReleaseHistory releases={releases} />
        </main>
      </div>
      <SiteFooter />
    </>
  )
}
