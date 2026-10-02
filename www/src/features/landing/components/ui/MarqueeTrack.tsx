import { cn } from '@/utils/cn.util'

interface MarqueeTrackProps {
  items: readonly string[]
  hidden?: boolean
}

/** One copy of the scrolling app names. The marquee renders two so the loop is seamless. */
export function MarqueeTrack({ items, hidden = false }: MarqueeTrackProps) {
  return (
    <ul aria-hidden={hidden || undefined} className={cn('flex shrink-0 items-center gap-3 pr-3')}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-line-strong bg-surface/70 px-5 py-2 font-display text-2xl whitespace-nowrap text-ink-soft"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}
