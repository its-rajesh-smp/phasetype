import { KeyCombo } from '@/components/ui/KeyCombo'
import { Container } from '@/components/ui/Container'
import { Marker } from '@/components/ui/Marker'
import { SlashMark } from '@/components/ui/SlashMark'
import { DOWNLOAD_OPTIONS } from '@/constants/download.constants'
import { DEMO_HOTKEY } from '../../constants/demo.constants'
import { HeroDemo } from '../demo/HeroDemo'
import { DownloadButtons } from '../ui/DownloadButtons'

/** Headline, download buttons and the looping product demo. Holds the page's only h1. */
export function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-14 pb-20 sm:pt-20">
      <SlashMark className="absolute top-10 -left-10 hidden h-72 w-14 opacity-70 blur-[1px] lg:block" />
      <SlashMark className="absolute top-40 -right-6 hidden h-44 w-9 opacity-50 lg:block" />

      <Container className="relative flex flex-col items-center gap-14">
        <div className="flex max-w-4xl animate-rise flex-col items-center gap-7 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/70 py-1 pr-3.5 pl-1.5 text-[13px] text-ink-soft backdrop-blur">
            <span className="rounded-full bg-ink px-2 py-0.5 text-[11px] font-semibold text-lime">macOS</span>
            AI writing for every app on your Mac
          </p>

          <h1 id="hero-title" className="font-display text-[56px] leading-[0.92] tracking-[-0.02em] text-balance text-ink sm:text-[88px] lg:text-[108px]">
            Better words, <Marker className="italic">right where</Marker> you type.
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-pretty text-muted sm:text-xl">
            Select text in any Mac app and press a hotkey. PhaseType fixes or rewrites it with AI, then pastes it
            straight back over your selection. No copying into a chat window, no switching tabs.
          </p>

          <DownloadButtons options={DOWNLOAD_OPTIONS} />

          <p className="flex items-center gap-2 text-[13px] text-muted">
            Open it from anywhere with <KeyCombo keys={DEMO_HOTKEY} label="Control Option Space" />
          </p>
        </div>

        <div className="w-full animate-rise [animation-delay:150ms]">
          <HeroDemo />
        </div>
      </Container>
    </section>
  )
}
