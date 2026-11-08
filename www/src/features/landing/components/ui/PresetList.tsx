'use client'

import { Check } from 'lucide-react'
import { useState } from 'react'
import { KeyCombo } from '@/components/ui/KeyCombo'
import { cn } from '@/utils/cn.util'
import type { PresetItem } from '../../types/landing.types'

/** The panel's preset picker. Click a preset to choose it. */
export function PresetList({ items }: { items: PresetItem[] }) {
  const [selected, setSelected] = useState(items[0]?.name)

  return (
    <div className="flex flex-col gap-2">
      <p className="flex items-center gap-2 px-1 text-xs font-medium text-muted">
        <KeyCombo keys={['⌘', 'P']} label="Command P" /> Choose a preset
      </p>
      <ul className="flex flex-col gap-2">
        {items.map((item) => {
          const isSelected = item.name === selected

          return (
            <li key={item.name}>
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelected(item.name)}
                className={cn(
                  'flex w-full cursor-pointer items-center gap-3 rounded-2xl border bg-surface/90 px-3.5 py-2.5 text-left shadow-card transition duration-200 hover:bg-surface active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-peach-ink',
                  isSelected ? 'border-peach-edge bg-surface' : 'border-white hover:translate-x-1'
                )}
              >
                <span
                  className={cn(
                    'flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200',
                    isSelected ? 'bg-peach-ink text-white' : 'border border-line text-subtle'
                  )}
                >
                  <Check aria-hidden key={String(isSelected)} className={cn('size-4', isSelected ? 'animate-pop-in' : 'opacity-0')} strokeWidth={3} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-ink">{item.name}</span>
                  <span className="block truncate text-xs text-muted">{item.instructions}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
