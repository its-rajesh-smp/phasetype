import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { STEP_ILLUSTRATIONS } from '../../constants/stepIllustrations.constants'
import { STEPS } from '../../constants/steps.constants'
import { StepCard } from '../ui/StepCard'

/** Select, press, paste, as three illustrated cards. */
export function HowItWorksSection() {
  return (
    <section id="how-it-works" aria-labelledby="how-it-works-title" className="py-24 sm:py-32">
      <Container className="reveal flex flex-col gap-14">
        <SectionHeading
          id="how-it-works-title"
          badge="How it works"
          title="Three keystrokes from rough to ready"
          description="PhaseType sits quietly in your menu bar. It steps in when you call it and hands control straight back."
        />
        <ol className="grid gap-5 md:grid-cols-3">
          {STEPS.map((step) => {
            const Illustration = STEP_ILLUSTRATIONS[step.illustration]
            return <StepCard key={step.number} step={step} illustration={<Illustration />} />
          })}
        </ol>
      </Container>
    </section>
  )
}
