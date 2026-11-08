import { useCallback, useMemo, useRef } from 'react'
import type { PanelCapture } from '../types/try.types'
import { useCopyFeedback } from './useCopyFeedback'
import { useEditor } from './useEditor'
import { usePanelHotkeys } from './usePanelHotkeys'
import { usePanelSession } from './usePanelSession'

/**
 * Wires the mock editor to the always-open PhaseType panel. With nothing selected the panel works on the whole draft;
 * a selection narrows it. The text is fixed at the first prompt until the result is replaced or the visitor starts over.
 */
export function usePlayground() {
  const editor = useEditor()
  const session = usePanelSession()
  const { copied, copy } = useCopyFeedback()
  const promptRef = useRef<HTMLInputElement>(null)
  const { text, selection, replaceRange, focus, loadSample: loadEditorSample } = editor
  const { capture, latest, reset, run } = session

  /** What a prompt would work on right now: the selection, or the whole draft when nothing is selected. */
  const liveSource = useMemo((): PanelCapture => {
    const selected = text.slice(selection.start, selection.end)
    return selected.trim() ? { text: selected, range: selection } : { text, range: { start: 0, end: text.length } }
  }, [selection, text])

  const source = capture ?? liveSource
  const isWholeDraft = source.range.start === 0 && source.range.end === text.length
  const result = latest?.status === 'done' ? latest.output : ''

  const runPrompt = useCallback((instruction: string, label = instruction) => run(instruction, label, liveSource), [liveSource, run])

  const startOver = useCallback(() => {
    reset()
    focus()
  }, [focus, reset])

  const replace = useCallback(() => {
    if (!capture || !result) return
    reset()
    replaceRange(capture.range, result)
  }, [capture, replaceRange, reset, result])

  const loadSample = useCallback(
    (id: string) => {
      reset()
      loadEditorSample(id)
    },
    [loadEditorSample, reset]
  )

  usePanelHotkeys({
    isOpen: capture !== null,
    onOpen: () => promptRef.current?.focus(),
    onClose: startOver,
    onReplace: replace
  })

  return {
    editor: { ...editor, loadSample },
    session,
    promptRef,
    source,
    isWholeDraft,
    isLocked: capture !== null,
    result,
    copied,
    runPrompt,
    startOver,
    replace,
    copyResult: () => copy(result)
  }
}
