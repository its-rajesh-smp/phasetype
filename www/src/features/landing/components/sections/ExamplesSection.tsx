import { Container } from '@/components/ui/Container'
import { Marker } from '@/components/ui/Marker'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ExampleSwitcher } from '../ExampleSwitcher'

/** Before and after examples for common rewrites. */
export function ExamplesSection() {
  return (
    <section id="examples" aria-labelledby="examples-title" className="bg-sunken/60 py-24 sm:py-32">
      <Container className="reveal flex flex-col gap-14">
        <SectionHeading
          id="examples-title"
          eyebrow="Examples"
          align="center"
          title={
            <>
              Say it <Marker className="italic">better</Marker>, in a second.
            </>
          }
          description="Fix typos, soften a tone, cut the waffle, switch languages, or start from a blank line. If you can describe it, PhaseType can write it."
        />
        <ExampleSwitcher />
      </Container>
    </section>
  )
}
