import { Container } from '@/components/ui/Container'
import { PillBadge } from '@/components/ui/PillBadge'
import { PrivacyBackdrop } from '../ui/PrivacyBackdrop'

/** Painted-sky card explaining how your text is handled. */
export function PrivacySection() {
  return (
    <section id="privacy" aria-labelledby="privacy-title" className="pb-24 sm:pb-32">
      <Container>
        <div className="reveal relative overflow-hidden rounded-[32px] bg-sky-tint px-6 py-12 sm:px-12 sm:py-16">
          <PrivacyBackdrop />

          <div className="relative flex max-w-xl flex-col items-start gap-6">
            <PillBadge>Privacy</PillBadge>
            <h2 id="privacy-title" className="text-4xl leading-[1.1] font-medium tracking-[-0.025em] text-balance text-ink sm:text-5xl">
              Your key. Your Mac. Your words.
            </h2>
            <p className="max-w-md text-lg leading-relaxed text-ink-soft">
              No account, no PhaseType cloud, no copy of your text or files sitting on someone else&apos;s server.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
