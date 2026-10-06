import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ExampleSwitcher } from '../ExampleSwitcher'

/** Before and after examples for common rewrites. */
export function ExamplesSection() {
  return (
    <section id="examples" aria-labelledby="examples-title" className="pb-24 sm:pb-32">
      <Container className="reveal flex flex-col gap-12">
        <SectionHeading
          id="examples-title"
          badge="Examples"
          title="Say it better, in a second"
          description="Fix typos, soften a tone, cut the waffle, switch languages, or start from a blank line. If you can describe it, PhaseType can write it."
        />
        <ExampleSwitcher />
      </Container>
    </section>
  )
}
