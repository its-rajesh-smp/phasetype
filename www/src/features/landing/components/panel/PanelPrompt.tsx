import { ArrowUp, Square, WandSparkles } from 'lucide-react'
import { cn } from '@/utils/cn.util'
import { Caret } from '../ui/Caret'

interface PanelPromptProps {
  value: string
  isTyping: boolean
  isStreaming: boolean
}

/** The instruction bar, showing typed text and a Run button, or Stop while streaming. */
export function PanelPrompt({ value, isTyping, isStreaming }: PanelPromptProps) {
  return (
    <div className="mx-4 flex h-11 items-center gap-3 rounded-xl border border-line-strong bg-canvas/60 pr-1.5 pl-4">
      <WandSparkles aria-hidden className="size-4 shrink-0 text-ember" />
      <p className="min-w-0 flex-1 truncate text-sm text-ink">
        {value || <span className="text-subtle">Ask for anything…</span>}
        {isTyping && <Caret />}
      </p>
      <span
        aria-hidden
        className={cn(
          'flex size-8 items-center justify-center rounded-lg transition-colors',
          value ? 'bg-ink text-canvas' : 'bg-ink/5 text-subtle'
        )}
      >
        {isStreaming ? <Square className="size-3 fill-current" /> : <ArrowUp className="size-4" />}
      </span>
    </div>
  )
}
