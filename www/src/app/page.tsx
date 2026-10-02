import { AnnouncementBar } from '@/components/layouts/AnnouncementBar'
import { SiteFooter } from '@/components/layouts/SiteFooter'
import { SiteHeader } from '@/components/layouts/SiteHeader'
import { JsonLd } from '@/components/seo/JsonLd'
import { AppsMarquee } from '@/features/landing/components/sections/AppsMarquee'
import { DownloadSection } from '@/features/landing/components/sections/DownloadSection'
import { ExamplesSection } from '@/features/landing/components/sections/ExamplesSection'
import { FaqSection } from '@/features/landing/components/sections/FaqSection'
import { FeaturesSection } from '@/features/landing/components/sections/FeaturesSection'
import { HeroSection } from '@/features/landing/components/sections/HeroSection'
import { HowItWorksSection } from '@/features/landing/components/sections/HowItWorksSection'
import { ModesSection } from '@/features/landing/components/sections/ModesSection'
import { PrivacySection } from '@/features/landing/components/sections/PrivacySection'
import { buildLandingStructuredData } from '@/features/landing/helpers/structuredData.helper'

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildLandingStructuredData()} />
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-sm text-canvas focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <div id="top" className="paper">
        <AnnouncementBar />
        <SiteHeader />
        <main id="main">
          <HeroSection />
          <AppsMarquee />
          <HowItWorksSection />
          <ModesSection />
          <ExamplesSection />
          <FeaturesSection />
          <PrivacySection />
          <FaqSection />
          <DownloadSection />
        </main>
      </div>
      <SiteFooter />
    </>
  )
}
