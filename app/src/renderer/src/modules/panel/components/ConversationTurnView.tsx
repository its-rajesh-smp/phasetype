import { RefreshCw } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { InlineMessage } from '../../../components/ui/InlineMessage'
import { cn } from '../../../utils/cn.util'
import type { ConversationTurn } from '../types/panel.types'
import { WritingPlaceholder } from './WritingPlaceholder'

interface ConversationTurnViewProps {
  turn: ConversationTurn
  presetName: string | null
  isLatest: boolean
  onRegenerate: () => void
}

/** One exchange: the prompt as a bubble on the right, then the answer (streaming, finished or failed). */
export function ConversationTurnView({ turn, presetName, isLatest, onRegenerate }: ConversationTurnViewProps): React.JSX.Element {
  const isStreaming = turn.status === 'streaming'

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex max-w-[85%] flex-col items-end gap-1 self-end">
        <p data-selectable className="rounded-2xl rounded-br-md bg-sunken px-3.5 py-2 text-[13.5px] leading-snug whitespace-pre-wrap text-ink-soft">
          {turn.label}
        </p>
        {presetName && <span className="pr-1 text-[11px] text-subtle">{presetName}</span>}
      </div>

      {turn.status === 'error' && turn.error ? (
        <InlineMessage tone="error">{turn.error}</InlineMessage>
      ) : isStreaming && !turn.output ? (
        <WritingPlaceholder />
      ) : (
        <p data-selectable className={cn('text-[15px] leading-relaxed whitespace-pre-wrap', isLatest ? 'text-ink' : 'text-ink-soft')}>
          {turn.output}
          {isStreaming && <span className="ml-0.5 inline-block h-[1.1em] w-[2px] animate-caret bg-ember align-text-bottom" />}
        </p>
      )}

      {isLatest && !isStreaming && (
        <div className="-mt-1 flex justify-end">
          <Button variant="ghost" size="sm" leadingIcon={<RefreshCw className="size-3.5" />} onClick={onRegenerate}>
            Regenerate
          </Button>
        </div>
      )}
    </div>
  )
}
