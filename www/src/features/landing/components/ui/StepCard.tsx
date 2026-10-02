import { KeyCombo } from '@/components/ui/KeyCombo'
import type { Step } from '../../types/landing.types'

/** A numbered "how it works" step, with its shortcut when it has one. */
export function StepCard({ step }: { step: Step }) {
  return (
    <li className="group relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-line bg-surface p-7 shadow-card transition-transform duration-300 hover:-translate-y-1">
      <span
        aria-hidden
        className="font-display text-[96px] leading-[0.8] text-line-strong transition-colors duration-300 group-hover:text-lime-deep"
      >
        {step.number}
      </span>
      <div className="flex flex-col gap-3">
        <h3 className="font-display text-4xl text-ink">{step.title}</h3>
        <p className="text-[15px] leading-relaxed text-muted">{step.description}</p>
      </div>
      {step.keys && <KeyCombo keys={step.keys} size="md" className="mt-auto" />}
    </li>
  )
}
