import { cn } from '@/utils/cn.util'
import type { SampleText } from '../../types/try.types'

interface SampleTabsProps {
  samples: SampleText[]
  activeId: string
  onSelect: (id: string) => void
}

/** Segmented control that loads a sample draft into the editor. */
export function SampleTabs({ samples, activeId, onSelect }: SampleTabsProps) {
  return (
    <div
      role="group"
      aria-label="Sample drafts"
      className="mx-auto flex max-w-full flex-wrap justify-center gap-1 rounded-3xl border border-line bg-surface p-1.5 shadow-card sm:rounded-full"
    >
      {samples.map((sample) => {
        const isActive = sample.id === activeId
        return (
          <button
            key={sample.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(sample.id)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-lime-edge focus-visible:outline-none',
              isActive ? 'bg-ink text-white' : 'text-muted hover:bg-sunken hover:text-ink'
            )}
          >
            {sample.label}
          </button>
        )
      })}
    </div>
  )
}
