import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SlashMark } from '@/components/ui/SlashMark'
import { KEY_HINT, PRIVACY_POINTS } from '../../constants/privacy.constants'
import { KeyHintCard } from '../ui/KeyHintCard'
import { PrivacyPointItem } from '../ui/PrivacyPointItem'

/** Dark panel explaining how the API key and your text are handled. */
export function PrivacySection() {
  return (
    <section id="privacy" aria-labelledby="privacy-title" className="pb-24 sm:pb-32">
      <Container>
        <div className="reveal relative overflow-hidden rounded-[36px] bg-ink px-6 py-14 sm:px-12 sm:py-20">
          <div aria-hidden className="absolute -top-40 -right-32 size-[28rem] rounded-full bg-lime/20 blur-3xl" />
          <SlashMark className="absolute -right-4 -bottom-16 hidden h-56 w-11 opacity-25 lg:block" />

          <div className="relative grid gap-14 lg:grid-cols-[1.1fr_1fr]">
            <div className="flex flex-col gap-10">
              <SectionHeading
                id="privacy-title"
                eyebrow="Privacy"
                tone="paper"
                title={
                  <>
                    Your key. Your Mac. <em className="text-lime">Your words.</em>
                  </>
                }
                description="No account, no PhaseType cloud, no copy of your text sitting on someone else's server."
              />
              <KeyHintCard hint={KEY_HINT} />
            </div>
            <ul className="flex flex-col gap-8 lg:pt-10">
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
