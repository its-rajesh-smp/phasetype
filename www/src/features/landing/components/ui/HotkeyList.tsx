import { CircleCheck } from 'lucide-react'
import { KeyCombo } from '@/components/ui/KeyCombo'
import type { HotkeyItem } from '../../types/landing.types'

/** The default shortcuts, each marked as free to use. */
export function HotkeyList({ items }: { items: HotkeyItem[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item.name} className="flex items-center justify-between gap-3 rounded-2xl border border-white bg-surface/90 px-4 py-3 shadow-card">
          <span className="text-sm font-semibold text-ink">{item.name}</span>
          <span className="flex items-center gap-3">
            <KeyCombo keys={item.keys} />
            <span className="hidden items-center gap-1 text-xs font-medium text-mint-ink sm:inline-flex">
              <CircleCheck aria-hidden className="size-3.5" /> Available
            </span>
          </span>
        </li>
      ))}
    </ul>
  )
}
