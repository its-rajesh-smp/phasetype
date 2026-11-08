import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { UPDATE_POINTS } from '../../constants/install.constants'
import { StepList } from '../ui/StepList'

/** How to move to a newer version. */
export function UpdatesSection() {
  return (
    <section aria-labelledby="updates-title" className="reveal py-20 sm:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading id="updates-title" badge="Updates" title="Staying up to date" />
        <StepList steps={UPDATE_POINTS} />
      </Container>
    </section>
  )
}
