import type { ModelUsage } from '../../types/settings.types'
import { formatCompact, formatUsd, pluralize } from '../../../../utils/text.util'

/** One row per model: how many requests used it, their tokens and estimated cost. */
export function ModelBreakdown({ models }: { models: ModelUsage[] }): React.JSX.Element {
  return (
    <ul className="flex flex-col divide-y divide-line rounded-2xl border border-line bg-surface/70">
      {models.map(({ model, requests, tokens, costUsd, hasUnpriced }) => (
        <li key={model} className="grid grid-cols-[minmax(0,1fr)_auto_4.5rem] items-center gap-x-5 px-4 py-2.5 text-[13px]">
          <span className="truncate font-medium text-ink" title={model}>
            {model}
          </span>
          <span className="text-muted">
            {pluralize(requests, 'request')} · {formatCompact(tokens)} tokens
          </span>
          <span className="text-right font-mono text-ink" title={hasUnpriced ? 'No price is known for this model.' : undefined}>
            {hasUnpriced ? '—' : formatUsd(costUsd)}
          </span>
        </li>
      ))}
    </ul>
  )
}
