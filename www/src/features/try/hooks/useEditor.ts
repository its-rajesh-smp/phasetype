import { useCallback, useRef, useState } from 'react'
import { SAMPLE_TEXTS } from '../constants/try.constants'
import type { TextRange } from '../types/try.types'

/** The mock editor's text, the sample it came from, and its live selection. */
export function useEditor() {
  const editorRef = useRef<HTMLTextAreaElement>(null)
  const [sampleId, setSampleId] = useState(SAMPLE_TEXTS[0].id)
  const [text, setText] = useState(SAMPLE_TEXTS[0].text)
  const [selection, setSelection] = useState<TextRange>({ start: 0, end: 0 })

  const sample = SAMPLE_TEXTS.find((item) => item.id === sampleId) ?? SAMPLE_TEXTS[0]

  /** Reads the selection straight from the textarea, which keeps it even after losing focus (e.g. a button tap). */
  const readSelection = useCallback((): TextRange => {
    const element = editorRef.current
    return element ? { start: element.selectionStart, end: element.selectionEnd } : { start: 0, end: 0 }
  }, [])

  const syncSelection = useCallback(() => setSelection(readSelection()), [readSelection])

  const loadSample = useCallback((id: string) => {
    const next = SAMPLE_TEXTS.find((item) => item.id === id)
    if (!next) return
    setSampleId(id)
    setText(next.text)
    setSelection({ start: 0, end: 0 })
  }, [])

  /** Swaps a range for new text, then selects the new text, the way pasting over a selection looks. */
  const replaceRange = useCallback((range: TextRange, replacement: string) => {
    setText((current) => current.slice(0, range.start) + replacement + current.slice(range.end))
    const nextRange = { start: range.start, end: range.start + replacement.length }
    setSelection(nextRange)
    requestAnimationFrame(() => {
      editorRef.current?.focus()
      editorRef.current?.setSelectionRange(nextRange.start, nextRange.end)
    })
  }, [])

  const focus = useCallback(() => editorRef.current?.focus(), [])

  return { editorRef, text, setText, sample, selection, syncSelection, readSelection, loadSample, replaceRange, focus }
}
