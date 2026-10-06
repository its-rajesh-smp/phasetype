import { cn } from '@/utils/cn.util'
import type { WritingExample } from '../../types/landing.types'

interface ExampleTabsProps {
  examples: WritingExample[]
  activeId: string
  onSelect: (id: string) => void
}

/** Segmented control for the examples. Stateless: the parent owns the active tab. */
export function ExampleTabs({ examples, activeId, onSelect }: ExampleTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Writing examples"
      className="mx-auto flex max-w-full flex-wrap justify-center gap-1 rounded-3xl border border-line bg-surface p-1.5 shadow-card sm:rounded-full"
    >
      {examples.map((example) => {
        const isActive = example.id === activeId
        return (
          <button
            key={example.id}
            type="button"
            role="tab"
            id={`example-tab-${example.id}`}
            aria-selected={isActive}
            aria-controls={`example-panel-${example.id}`}
            onClick={() => onSelect(example.id)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-lime-edge focus-visible:outline-none',
              isActive ? 'bg-ink text-white' : 'text-muted hover:bg-sunken hover:text-ink'
            )}
          >
            {example.label}
          </button>
        )
      })}
    </div>
  )
}
