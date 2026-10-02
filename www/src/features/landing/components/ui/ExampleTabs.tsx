import { cn } from '@/utils/cn.util'
import type { WritingExample } from '../../types/landing.types'

interface ExampleTabsProps {
  examples: WritingExample[]
  activeId: string
  onSelect: (id: string) => void
}

/** Tab buttons for the examples. Stateless: the parent owns the active tab. */
export function ExampleTabs({ examples, activeId, onSelect }: ExampleTabsProps) {
  return (
    <div role="tablist" aria-label="Writing examples" className="flex flex-wrap justify-center gap-2">
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
              'rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ember/50 focus-visible:outline-none',
              isActive ? 'border-ink bg-ink text-canvas' : 'border-line-strong bg-surface text-ink-soft hover:bg-sunken'
            )}
          >
            {example.label}
          </button>
        )
      })}
    </div>
  )
}
