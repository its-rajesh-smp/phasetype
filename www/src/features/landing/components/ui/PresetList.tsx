import { Check } from 'lucide-react'
import { KeyCombo } from '@/components/ui/KeyCombo'
import { cn } from '@/utils/cn.util'
import type { PresetItem } from '../../types/landing.types'

/** The panel's preset picker, with one preset chosen. */
export function PresetList({ items }: { items: PresetItem[] }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="flex items-center gap-2 px-1 text-xs font-medium text-muted">
        <KeyCombo keys={['⌘', 'P']} label="Command P" /> Choose a preset
      </p>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.name} className="flex items-center gap-3 rounded-2xl border border-white bg-surface/90 px-3.5 py-2.5 shadow-card">
            <span
              className={cn(
                'flex size-8 shrink-0 items-center justify-center rounded-lg',
                item.selected ? 'bg-peach-ink text-white' : 'border border-line text-subtle'
              )}
            >
              <Check aria-hidden className={cn('size-4', !item.selected && 'opacity-0')} strokeWidth={3} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink">{item.name}</p>
              <p className="truncate text-xs text-muted">{item.instructions}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
