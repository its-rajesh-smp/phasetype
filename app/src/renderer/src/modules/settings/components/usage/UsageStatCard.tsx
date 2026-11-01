import { formatCompact, formatUsd, pluralize } from '../../../../utils/text.util'
import type { UsageTotals } from '../../types/settings.types'

interface UsageStatCardProps {
  label: string
  totals: UsageTotals
}

/** One period's estimated cost, with its request and token counts underneath. */
export function UsageStatCard({ label, totals }: UsageStatCardProps): React.JSX.Element {
  return (
    <div className="flex min-w-0 flex-col gap-1 rounded-2xl border border-line bg-surface/70 px-4 py-3.5">
      <span className="text-[12px] font-medium text-subtle">{label}</span>
      <span className="font-mono text-[22px] leading-tight text-ink">{formatUsd(totals.costUsd)}</span>
      <span className="truncate text-[12px] text-muted">
        {pluralize(totals.requests, 'request')} · {formatCompact(totals.tokens)} tokens
      </span>
    </div>
  )
}
