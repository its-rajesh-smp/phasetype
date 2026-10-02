/** A numbered list item in the "how to use" instructions. */
export function UsageStep({ number, children }: { number: number; children: React.ReactNode }): React.JSX.Element {
  return (
    <li className="flex items-center gap-4 text-[15px] text-ink-soft">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface font-display text-lg text-ink">
        {number}
      </span>
      <span>{children}</span>
    </li>
  )
}
