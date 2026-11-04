import Image from 'next/image'
import faqCard from '@/assets/images/faq-card.webp'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FAQ_ENTRIES } from '../../constants/faq.constants'
import { FaqItem } from '../ui/FaqItem'

/** Frequently asked questions, with a painted landscape under the sticky heading on desktop. The same entries feed the FAQPage structured data. */
export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="pb-24 sm:pb-32">
      <Container className="reveal grid gap-12 lg:grid-cols-[1fr_1.7fr]">
        <div className="flex flex-col gap-10 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="faq-title"
            badge="FAQ"
            align="left"
            title="Questions, answered"
            description="Anything else? The app's Settings explain each option in plain words."
          />
          <div aria-hidden className="relative hidden aspect-[4/3] overflow-hidden rounded-[28px] border border-line shadow-card lg:block">
            <Image src={faqCard} alt="" fill placeholder="blur" sizes="400px" className="object-cover" />
          </div>
        </div>
        <ul className="divide-y divide-line overflow-hidden rounded-[28px] border border-line bg-surface shadow-card">
          {FAQ_ENTRIES.map((entry) => (
            <FaqItem key={entry.question} entry={entry} />
          ))}
        </ul>
      </Container>
    </section>
  )
}
