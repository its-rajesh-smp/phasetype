import { Plus } from 'lucide-react'
import type { FaqEntry } from '../../types/landing.types'

/** A question that expands to its answer. Uses native details, so it works without JavaScript. */
export function FaqItem({ entry }: { entry: FaqEntry }) {
  return (
    <li className="border-b border-line">
      <details className="group py-2">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-left [&::-webkit-details-marker]:hidden">
          <h3 className="text-lg font-medium tracking-[-0.01em] text-ink">{entry.question}</h3>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink transition-all duration-300 group-open:rotate-45 group-open:border-ink group-open:bg-ink group-open:text-lime">
            <Plus aria-hidden className="size-4" />
          </span>
        </summary>
        <p className="max-w-2xl pb-5 text-[15px] leading-relaxed text-muted">{entry.answer}</p>
      </details>
    </li>
  )
}
