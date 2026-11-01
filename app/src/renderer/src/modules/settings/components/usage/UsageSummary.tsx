import type { UsageRecord } from '@shared/types'
import { summarize, usagePeriods } from '../../helpers/usage.helper'
import { UsageStatCard } from './UsageStatCard'

/** Estimated cost, requests and tokens for today, the last 30 days and all time. */
export function UsageSummary({ records }: { records: UsageRecord[] }): React.JSX.Element {
  const periods = usagePeriods(new Date()).map((period) => ({
    ...period,
    totals: summarize(records.filter((record) => record.createdAt >= period.since))
  }))
  const hasUnpriced = periods.some((period) => period.totals.hasUnpriced)

  return (
    <div className="flex flex-col gap-2.5">
      <div className="grid grid-cols-3 gap-3">
        {periods.map(({ label, totals }) => (
          <UsageStatCard key={label} label={label} totals={totals} />
        ))}
      </div>
      {hasUnpriced && (
        <p className="text-[12px] text-subtle">Some requests used a model PhaseType has no price for, so they aren’t in the cost.</p>
      )}
    </div>
  )
}
