const LINE_WIDTHS = ['92%', '78%', '54%']

/** Shimmering skeleton lines shown before the first streamed text arrives. */
export function WritingPlaceholder(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-2 py-1" aria-label="Writing">
      {LINE_WIDTHS.map((width) => (
        <span
          key={width}
          style={{ width }}
          className="h-3 animate-shimmer rounded-full bg-[linear-gradient(90deg,var(--color-sunken)_0%,rgb(227_245_66/0.55)_50%,var(--color-sunken)_100%)] bg-[length:200%_100%]"
        />
      ))}
    </div>
  )
}
