import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FAQ_ENTRIES } from '../../constants/faq.constants'
import { FaqItem } from '../ui/FaqItem'

/** Frequently asked questions as a full-width list under a centered heading. The same entries feed the FAQPage structured data. */
export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="pb-24 sm:pb-32">
      <Container className="reveal flex flex-col gap-12">
        <SectionHeading
          id="faq-title"
          badge="FAQ"
          title="Questions, answered"
          description="Anything else? The app's Settings explain each option in plain words."
        />
        <ul className="divide-y divide-line overflow-hidden rounded-[28px] border border-line bg-surface shadow-card">
          {FAQ_ENTRIES.map((entry) => (
            <FaqItem key={entry.question} entry={entry} />
          ))}
        </ul>
      </Container>
    </section>
  )
}
