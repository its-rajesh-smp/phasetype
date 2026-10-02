import { RefreshCw } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { Eyebrow } from '../../../components/ui/Eyebrow'
import { InlineMessage } from '../../../components/ui/InlineMessage'
import type { StreamStatus } from '../types/panel.types'
import { WritingPlaceholder } from './WritingPlaceholder'

interface ResultViewProps {
  status: StreamStatus
  output: string
  error: string | null
  onRegenerate: () => void
}

/** Shows the streamed AI result (with a typing caret), a loading placeholder, or an error. Hidden while idle. */
export function ResultView({ status, output, error, onRegenerate }: ResultViewProps): React.JSX.Element | null {
  if (status === 'idle') return null
  const isStreaming = status === 'streaming'

  return (
    <div className="flex min-h-0 flex-col gap-2 border-t border-line px-5 pt-3 pb-4">
      <div className="flex h-7 items-center justify-between">
        <Eyebrow>{isStreaming ? 'Writing' : 'Result'}</Eyebrow>
        {!isStreaming && (
          <Button variant="ghost" size="sm" leadingIcon={<RefreshCw className="size-3.5" />} onClick={onRegenerate}>
            Regenerate
          </Button>
        )}
      </div>

      {status === 'error' && error ? (
        <InlineMessage tone="error">{error}</InlineMessage>
      ) : isStreaming && !output ? (
        <WritingPlaceholder />
      ) : (
        <p data-selectable className="max-h-[300px] overflow-y-auto text-[15px] leading-relaxed whitespace-pre-wrap text-ink">
          {output}
          {isStreaming && <span className="ml-0.5 inline-block h-[1.1em] w-[2px] animate-caret bg-ember align-text-bottom" />}
        </p>
      )}
    </div>
  )
}
