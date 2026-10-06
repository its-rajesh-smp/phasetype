import { Check } from 'lucide-react'
import type { ActivityItem } from '../../types/landing.types'

/** A short feed of recent rewrites in different apps. */
export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item.app} className="flex items-center gap-3 rounded-2xl border border-white bg-surface/90 px-3.5 py-2.5 shadow-card">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-mint-ink text-white">
            <Check aria-hidden className="size-4" strokeWidth={3} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">
              {item.action} <span className="font-normal text-subtle">· {item.time}</span>
            </p>
            <p className="truncate text-xs text-muted">
              {item.app} · {item.detail}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
