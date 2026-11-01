interface UsageHistoryDetailProps {
  label: string
  children: React.ReactNode
}

/** A labelled block of selectable text inside an opened history entry. */
export function UsageHistoryDetail({ label, children }: UsageHistoryDetailProps): React.JSX.Element {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11.5px] font-medium text-subtle">{label}</span>
      <div data-selectable className="rounded-xl bg-sunken/70 px-3 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap text-ink-soft">
        {children}
      </div>
    </div>
  )
}
