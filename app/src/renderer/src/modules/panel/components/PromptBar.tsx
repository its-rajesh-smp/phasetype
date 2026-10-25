import { ArrowUp, Square, WandSparkles } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { cn } from '../../../utils/cn.util'

interface PromptBarProps {
  value: string
  placeholder: string
  isStreaming: boolean
  /** Changes whenever the panel is reopened, to refocus the input. */
  sessionId: number
  /** True while another control (the preset menu) has focus; the input refocuses once it is false again. */
  suspendFocus: boolean
  onChange: (value: string) => void
  onSubmit: () => void
  onStop: () => void
}

/** Instruction input with a Run button, or a Stop button while streaming. Refocuses on each new session. */
export function PromptBar({ value, placeholder, isStreaming, sessionId, suspendFocus, onChange, onSubmit, onStop }: PromptBarProps): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!suspendFocus) inputRef.current?.focus()
  }, [sessionId, isStreaming, suspendFocus])

  return (
    <form
      className="mx-4 flex h-12 items-center gap-3 rounded-xl border border-line-strong bg-canvas/60 pr-1.5 pl-4 transition-colors focus-within:border-ink/35 focus-within:bg-surface"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <WandSparkles className="size-4 shrink-0 text-ember" />
      <input
        ref={inputRef}
        value={value}
        placeholder={placeholder}
        disabled={isStreaming}
        onChange={(event) => onChange(event.target.value)}
        spellCheck={false}
        className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-subtle disabled:opacity-60"
      />
      {isStreaming ? (
        <button
          type="button"
          onClick={onStop}
          aria-label="Stop generating"
          className="flex size-9 items-center justify-center rounded-lg bg-ink text-canvas transition-colors hover:bg-ink-soft"
        >
          <Square className="size-3 fill-current" />
        </button>
      ) : (
        <button
          type="submit"
          aria-label="Run"
          disabled={!value.trim()}
          className={cn(
            'flex size-9 items-center justify-center rounded-lg transition-colors',
            value.trim() ? 'bg-ink text-canvas hover:bg-ink-soft' : 'bg-ink/5 text-subtle'
          )}
        >
          <ArrowUp className="size-4" />
        </button>
      )}
    </form>
  )
}
