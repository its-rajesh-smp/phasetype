import { Container } from '@/components/ui/Container'
import { Marker } from '@/components/ui/Marker'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { STEPS } from '../../constants/steps.constants'
import { StepCard } from '../ui/StepCard'

/** Select, press, paste, as three numbered cards. */
export function HowItWorksSection() {
  return (
    <section id="how-it-works" aria-labelledby="how-it-works-title" className="py-24 sm:py-32">
      <Container className="reveal flex flex-col gap-14">
        <SectionHeading
          id="how-it-works-title"
          eyebrow="How it works"
          title={
            <>
              Three keystrokes from <Marker>rough</Marker> to ready.
            </>
          }
          description="PhaseType sits quietly in your menu bar. It only steps in when you call it, and it hands control straight back."
        />
        <ol className="grid gap-5 md:grid-cols-3">
          {STEPS.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </ol>
      </Container>
    </section>
  )
}
