import { Plus } from 'lucide-react'
import type { FaqEntry } from '../../types/landing.types'

/** A question that expands to its answer. Uses native details, so it works without JavaScript. */
export function FaqItem({ entry }: { entry: FaqEntry }) {
  return (
    <li>
      <details className="group px-5 sm:px-7">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
          <h3 className="text-base font-semibold text-ink sm:text-lg">{entry.question}</h3>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sunken text-ink transition-all duration-300 group-open:rotate-45 group-open:bg-lime">
            <Plus aria-hidden className="size-4" />
          </span>
        </summary>
        <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-muted">{entry.answer}</p>
      </details>
    </li>
  )
}
