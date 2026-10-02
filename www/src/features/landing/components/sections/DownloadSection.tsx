import { Container } from '@/components/ui/Container'
import { LogoMark } from '@/components/ui/LogoMark'
import { Marker } from '@/components/ui/Marker'
import { DOWNLOAD_OPTIONS } from '@/constants/download.constants'
import { DownloadButtons } from '../ui/DownloadButtons'

/** Closing call to download, on warm paper. */
export function DownloadSection() {
  return (
    <section id="download" aria-labelledby="download-title" className="paper border-t border-line py-24 sm:py-32">
      <Container className="reveal flex flex-col items-center gap-8 text-center">
        <LogoMark className="size-20 rotate-[-6deg] drop-shadow-[0_20px_30px_rgb(22_19_15/0.3)] sm:size-24" />
        <h2 id="download-title" className="max-w-3xl font-display text-5xl leading-[0.95] tracking-[-0.015em] text-balance sm:text-7xl">
          Stop pasting into <Marker className="italic">chat windows.</Marker>
        </h2>
        <p className="max-w-xl text-lg leading-relaxed text-muted">
          Download PhaseType, add your OpenAI key, pick your hotkeys. You will be rewriting in under a minute.
        </p>
        <DownloadButtons options={DOWNLOAD_OPTIONS} />
      </Container>
    </section>
  )
}
