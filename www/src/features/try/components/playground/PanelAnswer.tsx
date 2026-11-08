import { Eyebrow } from '@/components/ui/Eyebrow'
import { WritingPlaceholder } from '@/features/landing/components/panel/WritingPlaceholder'
import { Caret } from '@/features/landing/components/ui/Caret'
import { useScrollIntoViewOnMount } from '../../hooks/useScrollIntoViewOnMount'
import type { PlaygroundTurn } from '../../types/try.types'

/** The latest answer, labelled with its prompt: a shimmer before the first word, then the text with a caret. */
export function PanelAnswer({ turn, turnCount }: { turn: PlaygroundTurn; turnCount: number }) {
  const isStreaming = turn.status === 'streaming'
  // On phones the answer appears below the fold, so bring it into view when it first shows up.
  const ref = useScrollIntoViewOnMount<HTMLDivElement>()

  return (
    <div ref={ref} className="mt-3 flex scroll-mb-4 flex-col gap-2 border-t border-line px-5 pt-3 pb-4">
      <Eyebrow className="min-w-0 text-[10px]">
        <span className="shrink-0">{isStreaming ? 'Writing' : turnCount > 1 ? `Result · ${turnCount}` : 'Result'}</span>
        <span className="truncate font-medium tracking-normal normal-case">{turn.label}</span>
      </Eyebrow>
      {isStreaming && !turn.output ? (
        <WritingPlaceholder />
      ) : (
        <p aria-live="polite" className="max-h-72 min-h-[4.5em] overflow-y-auto text-sm leading-relaxed whitespace-pre-wrap text-ink">
          {turn.output}
          {isStreaming && <Caret />}
        </p>
      )}
    </div>
  )
}
