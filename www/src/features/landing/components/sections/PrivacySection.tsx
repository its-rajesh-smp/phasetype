import { Container } from '@/components/ui/Container'
import { PillBadge } from '@/components/ui/PillBadge'
import { KEY_HINT, PRIVACY_POINTS } from '../../constants/privacy.constants'
import { KeyHintCard } from '../ui/KeyHintCard'
import { PrivacyBackdrop } from '../ui/PrivacyBackdrop'
import { PrivacyPointItem } from '../ui/PrivacyPointItem'

/** Painted-sky card explaining how the API key and your text are handled. */
export function PrivacySection() {
  return (
    <section id="privacy" aria-labelledby="privacy-title" className="pb-24 sm:pb-32">
      <Container>
        <div className="reveal relative overflow-hidden rounded-[32px] bg-sky-tint px-6 py-12 sm:px-12 sm:py-16">
          <PrivacyBackdrop />

          <div className="relative grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
            <div className="flex flex-col items-start gap-6">
              <PillBadge>Privacy</PillBadge>
              <h2 id="privacy-title" className="text-4xl leading-[1.1] font-medium tracking-[-0.025em] text-balance text-ink sm:text-5xl">
                Your key. Your Mac. Your words.
              </h2>
              <p className="max-w-md text-lg leading-relaxed text-ink-soft">
                No account, no PhaseType cloud, no copy of your text sitting on someone else&apos;s server.
              </p>
              <KeyHintCard hint={KEY_HINT} />
            </div>
            <ul className="flex flex-col gap-3">
              {PRIVACY_POINTS.map((point) => (
                <PrivacyPointItem key={point.title} point={point} />
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
