import { Container } from '@/components/ui/Container'
import { LogoMark } from '@/components/ui/LogoMark'
import { Marker } from '@/components/ui/Marker'
import { DOWNLOAD_OPTIONS } from '@/constants/download.constants'
import { FACTS } from '../../constants/facts.constants'
import { DownloadButtons } from '../ui/DownloadButtons'
import { FactItem } from '../ui/FactItem'

/** Closing call to download, with a row of product facts. */
export function DownloadSection() {
  return (
    <section id="download" aria-labelledby="download-title" className="border-t border-line py-24 sm:py-32">
      <Container className="reveal flex flex-col items-center gap-8 text-center">
        <LogoMark className="size-16 drop-shadow-[0_16px_24px_rgb(10_10_10/0.25)] sm:size-20" />
        <h2
          id="download-title"
          className="max-w-3xl text-[44px] leading-[1] font-normal tracking-[-0.035em] text-balance text-ink sm:text-6xl"
        >
          Stop pasting into <Marker>chat windows</Marker>
        </h2>
        <p className="max-w-xl text-lg leading-relaxed text-muted">
          Download PhaseType, add your OpenAI key, pick your hotkeys. You will be rewriting in under a minute.
        </p>
        <dl className="my-2 grid w-full max-w-2xl grid-cols-3 divide-x divide-line border-y border-line py-6">
          {FACTS.map((fact) => (
            <FactItem key={fact.label} fact={fact} />
          ))}
        </dl>
        <DownloadButtons options={DOWNLOAD_OPTIONS} secondary={{ label: 'Read the FAQ', href: '#faq' }} />
      </Container>
    </section>
  )
}
