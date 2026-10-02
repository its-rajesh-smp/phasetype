import { Eyebrow } from '@/components/ui/Eyebrow'
import { Caret } from '../ui/Caret'
import { WritingPlaceholder } from './WritingPlaceholder'

interface PanelResultProps {
  output: string
  isStreaming: boolean
}

/** The streamed result, with a caret while writing and a shimmer before the first word. */
export function PanelResult({ output, isStreaming }: PanelResultProps) {
  return (
    <div className="mt-3 flex flex-col gap-2 border-t border-line px-5 pt-3 pb-4">
      <Eyebrow className="text-[10px]">{isStreaming ? 'Writing' : 'Result'}</Eyebrow>
      {isStreaming && !output ? (
        <WritingPlaceholder />
      ) : (
        <p className="min-h-[4.5em] text-sm leading-relaxed whitespace-pre-line text-ink">
          {output}
          {isStreaming && <Caret />}
        </p>
      )}
    </div>
  )
}
