interface MarqueeTrackProps {
  items: readonly string[]
  hidden?: boolean
}

/** One copy of the scrolling app names. The marquee renders two so the loop is seamless. */
export function MarqueeTrack({ items, hidden = false }: MarqueeTrackProps) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-3 pr-3">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-line bg-surface px-5 py-2.5 text-base font-medium whitespace-nowrap text-ink-soft shadow-card"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}
