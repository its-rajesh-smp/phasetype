import { SpellCheck } from 'lucide-react'
import { cn } from '@/utils/cn.util'
import type { Suggestion } from '../../types/try.types'

interface PanelSuggestionsProps {
  /** Shown first with an icon, e.g. Fix the sentence. */
  primary?: Suggestion
  suggestions: Suggestion[]
  disabled: boolean
  onRun: (suggestion: Suggestion) => void
}

const CHIP_CLASSES =
  'inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-medium transition-colors focus-visible:ring-2 focus-visible:ring-lime-edge focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40'

/** One-click prompts, so trying PhaseType needs no typing. */
export function PanelSuggestions({ primary, suggestions, disabled, onRun }: PanelSuggestionsProps) {
  return (
    <div className="flex flex-wrap gap-2 px-4 pb-3">
      {primary && (
        <button
          type="button"
          disabled={disabled}
          onClick={() => onRun(primary)}
          className={cn(CHIP_CLASSES, 'border-ink bg-ink text-white hover:bg-ink-soft')}
        >
          <SpellCheck aria-hidden className="size-3.5 text-lime" /> {primary.label}
        </button>
      )}
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.label}
          type="button"
          disabled={disabled}
          onClick={() => onRun(suggestion)}
          className={cn(CHIP_CLASSES, 'border-line-strong bg-surface text-ink hover:bg-sunken')}
        >
          {suggestion.label}
        </button>
      ))}
    </div>
  )
}
