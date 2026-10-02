import { useCallback, useState } from 'react'
import { useTransientFlag } from '../../../hooks/useTransientFlag'
import { bridge } from '../../../services/bridge.service'
import { PROMPT_PLACEHOLDERS } from '../constants/panel.constants'
import type { RunInput } from '../types/panel.types'
import { useAiStream } from './useAiStream'
import { usePanelSession } from './usePanelSession'
import { usePanelShortcuts } from './usePanelShortcuts'

/** Everything the panel does: run prompts on the selection, refine results, copy and paste. */
export function usePanel() {
  const stream = useAiStream()
  const [prompt, setPrompt] = useState('')
  const [lastRun, setLastRun] = useState<RunInput | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)
  const [copied, flashCopied] = useTransientFlag()

  const { reset: resetStream } = stream
  const resetSession = useCallback(() => {
    resetStream()
    setPrompt('')
    setLastRun(null)
    setActionError(null)
  }, [resetStream])

  const { context, sessionId } = usePanelSession(resetSession)

  const isStreaming = stream.status === 'streaming'
  const hasResult = stream.status === 'done' && stream.output.trim().length > 0
  // Once there is a result, follow-up prompts refine it instead of the original selection.
  const workingText = hasResult ? stream.output : context.selectedText

  const placeholder = hasResult
    ? PROMPT_PLACEHOLDERS.refining
    : context.selectedText
      ? PROMPT_PLACEHOLDERS.withSelection
      : PROMPT_PLACEHOLDERS.withoutSelection

  const run = (instruction: string): void => {
    if (!instruction.trim() || isStreaming) return
    const input = { instruction: instruction.trim(), text: workingText }
    setActionError(null)
    setLastRun(input)
    setPrompt('')
    stream.run(input)
  }

  const regenerate = (): void => {
    if (lastRun && !isStreaming) stream.run(lastRun)
  }

  const copy = async (): Promise<void> => {
    if (!hasResult) return
    await bridge.panel.copy(stream.output)
    flashCopied()
  }

  const paste = async (): Promise<void> => {
    if (!hasResult) return
    const result = await bridge.panel.paste(stream.output)
    if (!result.ok) setActionError(result.error)
  }

  const escape = (): void => {
    if (isStreaming) stream.cancel()
    else bridge.panel.hide()
  }

  usePanelShortcuts({ onEscape: escape, onPaste: () => void paste(), onCopy: () => void copy() })

  return {
    context,
    sessionId,
    prompt,
    setPrompt,
    placeholder,
    workingText,
    stream,
    isStreaming,
    hasResult,
    copied,
    actionError,
    run,
    regenerate,
    copy,
    paste,
    stop: stream.cancel
  }
}
