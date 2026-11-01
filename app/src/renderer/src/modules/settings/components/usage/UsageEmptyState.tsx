import { ChartNoAxesColumn } from 'lucide-react'

/** Shown in place of the summary and history before the first request. */
export function UsageEmptyState(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      <span className="flex size-11 items-center justify-center rounded-xl bg-ink text-lime">
        <ChartNoAxesColumn className="size-5" />
      </span>
      <div className="flex flex-col gap-1">
        <p className="text-[15px] font-semibold text-ink">No requests yet</p>
        <p className="max-w-72 text-[13px] leading-relaxed text-muted">Use the panel or quick fix, and each request shows up here with its cost.</p>
      </div>
    </div>
  )
}
