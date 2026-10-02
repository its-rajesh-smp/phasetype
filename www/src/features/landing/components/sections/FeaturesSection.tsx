import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FEATURES } from '../../constants/features.constants'
import { FeatureCard } from '../ui/FeatureCard'

/** Bento grid of features. The first tile is highlighted in lime. */
export function FeaturesSection() {
  return (
    <section id="features" aria-labelledby="features-title" className="py-24 sm:py-32">
      <Container className="reveal flex flex-col gap-14">
        <SectionHeading
          id="features-title"
          eyebrow="Features"
          title={
            <>
              Small app. <em>Sweats the details.</em>
            </>
          }
          description="Everything is built around one idea: you should never have to leave the thing you are writing."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} highlighted={index === 0} />
          ))}
        </ul>
      </Container>
    </section>
  )
}
