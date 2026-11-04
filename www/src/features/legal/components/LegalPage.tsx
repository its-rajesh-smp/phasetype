import { SiteFooter } from '@/components/layouts/SiteFooter'
import { SiteHeader } from '@/components/layouts/SiteHeader'
import { HeroLandscape } from '@/components/ui/HeroLandscape'
import type { LegalDocument } from '../types/legal.types'
import { LegalBanner } from './LegalBanner'
import { LegalContent } from './LegalContent'

/** Full legal page: header over a short full-width landscape banner, the document, then the footer. */
export function LegalPage({ document }: { document: LegalDocument }) {
  return (
    <>
      <div className="relative flow-root">
        <HeroLandscape image={document.banner} className="absolute inset-x-0 top-0 h-[400px] sm:h-[440px]" />
        <SiteHeader />
        <main id="main" className="relative">
          <LegalBanner title={document.title} summary={document.summary} updated={document.updated} />
          <LegalContent sections={document.sections} />
        </main>
      </div>
      <SiteFooter />
    </>
  )
}
