import { ArrowUp, Square, WandSparkles } from 'lucide-react'
import type { RefObject } from 'react'
import { TRY_LIMITS } from '../../constants/limits.constants'
import { cn } from '@/utils/cn.util'

interface PromptInputProps {
  inputRef: RefObject<HTMLInputElement | null>
  value: string
  placeholder: string
  isStreaming: boolean
  disabled: boolean
  onChange: (value: string) => void
  onSubmit: () => void
  onStop: () => void
}

/** The instruction bar: type what to do and press Return, or stop an answer while it streams. */
export function PromptInput({ inputRef, value, placeholder, isStreaming, disabled, onChange, onSubmit, onStop }: PromptInputProps) {
  const canSubmit = !disabled && value.trim().length > 0

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        if (canSubmit) onSubmit()
      }}
      className="mx-4 flex h-11 items-center gap-3 rounded-xl border border-line-strong bg-canvas/60 pr-1.5 pl-4 focus-within:border-ink/30 focus-within:bg-surface"
    >
      <WandSparkles aria-hidden className="size-4 shrink-0 text-ember" />
      <label htmlFor="try-prompt" className="sr-only">
        Tell PhaseType what to do
      </label>
      <input
        id="try-prompt"
        ref={inputRef}
        autoComplete="off"
        value={value}
        maxLength={TRY_LIMITS.maxInstructionChars}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-subtle"
      />
      {isStreaming ? (
        <button
          type="button"
          onClick={onStop}
          aria-label="Stop"
          className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-ink text-canvas"
        >
          <Square aria-hidden className="size-3 fill-current" />
        </button>
      ) : (
        <button
          type="submit"
          disabled={!canSubmit}
          aria-label="Run"
          className={cn(
            'flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-lime-edge focus-visible:outline-none',
            canSubmit ? 'bg-ink text-canvas hover:bg-ink-soft' : 'bg-ink/5 text-subtle'
          )}
        >
          <ArrowUp aria-hidden className="size-4" />
        </button>
      )}
    </form>
  )
}
