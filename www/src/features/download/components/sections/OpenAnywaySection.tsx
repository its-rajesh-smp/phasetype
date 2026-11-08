import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { OPEN_ANYWAY_STEPS } from '../../constants/install.constants'
import { StepList } from '../ui/StepList'

/** The one-time macOS approval for the .dmg version. */
export function OpenAnywaySection() {
  return (
    <section id="open-anyway" aria-labelledby="open-anyway-title" className="reveal scroll-mt-24 py-20 sm:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          id="open-anyway-title"
          badge="Using the .dmg"
          title="Opening it the first time"
          description="PhaseType is made by one independent developer and isn’t registered with Apple, so macOS asks you to confirm once."
        />
        <StepList steps={OPEN_ANYWAY_STEPS} />
      </Container>
    </section>
  )
}
