import { Cpu } from 'lucide-react'
import type { UsageItem } from '../../types/landing.types'

/** Settings › Usage in miniature: requests and estimated cost per model. */
export function UsageList({ items }: { items: UsageItem[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item.model} className="flex items-center gap-3 rounded-2xl border border-white bg-surface/90 px-3.5 py-2.5 shadow-card">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-ink text-white">
            <Cpu aria-hidden className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-mono text-sm text-ink">{item.model}</p>
            <p className="truncate text-xs text-muted">{item.detail}</p>
          </div>
          <span className="font-mono text-sm text-ink tabular-nums">{item.cost}</span>
        </li>
      ))}
    </ul>
  )
}
