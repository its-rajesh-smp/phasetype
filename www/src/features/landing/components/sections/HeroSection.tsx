import { Container } from '@/components/ui/Container'
import { Marker } from '@/components/ui/Marker'
import { DOWNLOAD_OPTIONS } from '@/constants/download.constants'
import { HeroDemo } from '../demo/HeroDemo'
import { DownloadButtons } from '../ui/DownloadButtons'

/** Headline, download button and the looping product demo. Holds the page's only h1. */
export function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="pt-20 pb-20 sm:pt-28">
      <Container className="flex flex-col items-center gap-16">
        <div className="flex max-w-4xl animate-rise flex-col items-center gap-7 text-center">
          <h1
            id="hero-title"
            className="text-[44px] leading-[0.98] font-normal tracking-[-0.035em] text-balance text-ink sm:text-6xl lg:text-[76px]"
          >
            Better words, <Marker>right where</Marker> you type.
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-pretty text-ink/75 sm:text-xl">
            Select text in any app, press a hotkey, and PhaseType rewrites it in place.
          </p>

          <DownloadButtons options={DOWNLOAD_OPTIONS} showDetails={false} className="mt-2" />
        </div>

        <div className="w-full animate-rise [animation-delay:150ms]">
          <HeroDemo />
        </div>
      </Container>
    </section>
  )
}
