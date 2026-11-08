import type { InstallStep } from '../../constants/install.constants'

/** A numbered list of short steps, each with a bold title and one line of detail. */
export function StepList({ steps }: { steps: InstallStep[] }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-3">
      {steps.map((step, index) => (
        <li key={step.title} className="flex flex-col gap-2 rounded-3xl border border-line bg-surface p-6 shadow-card">
          <p className="font-mono text-sm text-subtle">{String(index + 1).padStart(2, '0')}</p>
          <h3 className="text-lg font-medium tracking-[-0.02em] text-ink">{step.title}</h3>
          <p className="text-[15px] leading-relaxed text-muted">{step.detail}</p>
        </li>
      ))}
    </ol>
  )
}
