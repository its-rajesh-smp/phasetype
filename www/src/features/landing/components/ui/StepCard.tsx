import type { Step } from '../../types/landing.types'

interface StepCardProps {
  step: Step
  illustration: React.ReactNode
}

/** A "how it works" card: illustration panel on top, number and copy below. */
export function StepCard({ step, illustration }: StepCardProps) {
  return (
    <li className="flex flex-col gap-2 rounded-3xl border border-line bg-surface p-2 shadow-card transition-transform duration-300 hover:-translate-y-1">
      <div className="flex h-48 items-center justify-center rounded-[20px] bg-sunken px-6">{illustration}</div>
      <div className="flex flex-col gap-2 px-4 pt-3 pb-5">
        <p className="font-mono text-sm text-subtle">{step.number}</p>
        <h3 className="text-2xl font-medium tracking-[-0.03em] text-ink">{step.title}</h3>
        <p className="text-[15px] leading-relaxed text-muted">{step.description}</p>
      </div>
    </li>
  )
}
