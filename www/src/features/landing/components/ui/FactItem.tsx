import type { Fact } from '../../types/landing.types'

/** A big monospace number with its label. */
export function FactItem({ fact }: { fact: Fact }) {
  return (
    <div className="flex flex-col-reverse items-center gap-1 px-4">
      <dt className="text-sm font-medium text-muted">{fact.label}</dt>
      <dd className="font-mono text-4xl text-ink sm:text-5xl">{fact.value}</dd>
    </div>
  )
}
