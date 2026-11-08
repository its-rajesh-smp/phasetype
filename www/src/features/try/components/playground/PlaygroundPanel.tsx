import { RotateCcw } from 'lucide-react'
import type { RefObject } from 'react'
import { PanelCard } from '@/features/landing/components/panel/PanelCard'
import type { PlaygroundTurn, Suggestion, TryPreset } from '../../types/try.types'
import { PanelAnswer } from './PanelAnswer'
import { PanelFooter } from './PanelFooter'
import { PanelNotice } from './PanelNotice'
import { PanelSource } from './PanelSource'
import { PanelStyleRow } from './PanelStyleRow'
import { PanelSuggestions } from './PanelSuggestions'
import { PromptInput } from './PromptInput'

interface PlaygroundPanelProps {
  promptRef: RefObject<HTMLInputElement | null>
  sourceText: string
  isWholeDraft: boolean
  turns: PlaygroundTurn[]
  prompt: string
  placeholder: string
  primarySuggestion?: Suggestion
  suggestions: Suggestion[]
  presets: TryPreset[]
  presetId: string | null
  error: { message: string; kind: string } | null
  remaining: number | null
  isReady: boolean
  copied: boolean
  onPromptChange: (value: string) => void
  onSubmit: () => void
  onSuggestion: (suggestion: Suggestion) => void
  onStop: () => void
  onPresetChange: (id: string | null) => void
  onCopy: () => void
  onReplace: () => void
  onStartOver: () => void
}

/** The always-open PhaseType panel: what it works on, one-click prompts, styles, the prompt, the answer and actions. */
export function PlaygroundPanel(props: PlaygroundPanelProps) {
  const { turns, error, prompt } = props
  const latest = turns.at(-1)
  const isStreaming = latest?.status === 'streaming'
  const isOutOfTries = error?.kind === 'limit'
  const isBusy = isStreaming || isOutOfTries

  return (
    <section aria-label="PhaseType panel">
      <PanelCard
        action={
          turns.length ? (
            <button
              type="button"
              onClick={props.onStartOver}
              className="-mr-2 inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-medium text-muted transition-colors hover:bg-sunken hover:text-ink focus-visible:ring-2 focus-visible:ring-lime-edge focus-visible:outline-none"
            >
              <RotateCcw aria-hidden className="size-3.5" /> Start over
            </button>
          ) : (
            <span className="text-[11px] font-semibold tracking-[0.16em] text-subtle uppercase">Live demo</span>
          )
        }
      >
        <PanelSource text={props.sourceText} isWholeDraft={props.isWholeDraft} />
        <PanelSuggestions primary={props.primarySuggestion} suggestions={props.suggestions} disabled={isBusy} onRun={props.onSuggestion} />
        <PanelStyleRow presets={props.presets} presetId={props.presetId} disabled={isBusy} onPresetChange={props.onPresetChange} />
        <PromptInput
          inputRef={props.promptRef}
          value={prompt}
          placeholder={props.placeholder}
          isStreaming={isStreaming}
          disabled={isBusy}
          onChange={props.onPromptChange}
          onSubmit={props.onSubmit}
          onStop={props.onStop}
        />
        {error && <PanelNotice message={error.message} isLimit={isOutOfTries} />}
        {latest && <PanelAnswer turn={latest} turnCount={turns.length} />}
        <PanelFooter isReady={props.isReady} copied={props.copied} remaining={props.remaining} onCopy={props.onCopy} onReplace={props.onReplace} />
      </PanelCard>
    </section>
  )
}
