import { Container } from '@/components/ui/Container'
import type { LegalSection } from '../types/legal.types'

/** The document body: numbered sections in a single white card at reading width. */
export function LegalContent({ sections }: { sections: LegalSection[] }) {
  return (
    <section className="pb-24 sm:pb-32">
      <Container className="max-w-3xl">
        <article className="flex flex-col divide-y divide-line rounded-[28px] border border-line bg-surface px-6 shadow-card sm:px-10">
          {sections.map((section, index) => (
            <div key={section.id} id={section.id} className="flex scroll-mt-28 flex-col gap-3 py-8">
              <h2 className="flex items-baseline gap-3 text-xl font-medium tracking-[-0.02em] text-ink sm:text-2xl">
                <span className="font-mono text-sm text-subtle">{String(index + 1).padStart(2, '0')}</span>
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[15px] leading-relaxed text-pretty text-muted">
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul className="flex list-disc flex-col gap-2 pl-5 text-[15px] leading-relaxed text-muted marker:text-subtle">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </article>
      </Container>
    </section>
  )
}
