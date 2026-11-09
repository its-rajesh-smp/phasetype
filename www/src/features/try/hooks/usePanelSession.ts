import { useCallback, useRef, useState } from 'react'
import { TRY_LIMITS } from '../constants/limits.constants'
import { streamTry, TryRequestError } from '../services/streamTry.service'
import type { PanelCapture, PlaygroundTurn, TryErrorKind } from '../types/try.types'

interface SessionError {
  message: string
  kind: TryErrorKind
}

const toSessionError = (caught: unknown): SessionError =>
  caught instanceof TryRequestError
    ? { message: caught.message, kind: caught.kind }
    : { message: 'Could not reach PhaseType. Check your connection and try again.', kind: 'unavailable' }

/**
 * One panel session: the text it works on (fixed at the first prompt), the prompts and streamed answers, the chosen
 * preset, and errors. Follow-up prompts refine the last answer, like the app's conversation.
 */
export function usePanelSession(initialPresetId: string | null = null) {
  const [capture, setCapture] = useState<PanelCapture | null>(null)
  const [turns, setTurns] = useState<PlaygroundTurn[]>([])
  const [prompt, setPrompt] = useState('')
  const [presetId, setPresetId] = useState<string | null>(initialPresetId)
  const [error, setError] = useState<SessionError | null>(null)
  const [remaining, setRemaining] = useState<number | null>(null)
  const controllerRef = useRef<AbortController | null>(null)

  const latest = turns.at(-1) ?? null
  const isStreaming = latest?.status === 'streaming'

  /** Cancels any answer in flight and detaches it, so its late chunks can't land in a new session. */
  const detach = useCallback(() => {
    controllerRef.current?.abort()
    controllerRef.current = null
  }, [])

  const reset = useCallback(() => {
    detach()
    setCapture(null)
    setTurns([])
    setPrompt('')
    setError(null)
  }, [detach])

  /** Runs a prompt on the session's text, or on `source` if this is the first prompt. */
  const run = useCallback(
    async (instruction: string, label: string, source: PanelCapture) => {
      const trimmed = instruction.trim()
      const target = capture ?? source
      if (!trimmed) return
      if (target.text.length > TRY_LIMITS.maxTextChars) {
        setError({ message: `Select under ${TRY_LIMITS.maxTextChars.toLocaleString()} characters to try it here.`, kind: 'invalid' })
        return
      }
      detach()
      const controller = new AbortController()
      controllerRef.current = controller
      const isCurrent = (): boolean => controllerRef.current === controller

      const done = turns.filter((turn) => turn.status === 'done')
      const history = done.slice(-TRY_LIMITS.maxHistoryTurns).map(({ instruction: text, output }) => ({ instruction: text, output }))
      const updateLatest = (update: (turn: PlaygroundTurn) => PlaygroundTurn): void =>
        setTurns((current) => [...current.slice(0, -1), update(current[current.length - 1])])

      setCapture(target)
      setTurns([...done, { instruction: trimmed, label: label.trim(), output: '', status: 'streaming' }])
      setPrompt('')
      setError(null)

      try {
        await streamTry({
          request: { instruction: trimmed, text: target.text, presetId, history },
          signal: controller.signal,
          onRemaining: (left) => isCurrent() && setRemaining(left),
          onDelta: (delta) => isCurrent() && updateLatest((turn) => ({ ...turn, output: turn.output + delta }))
        })
        if (isCurrent()) updateLatest((turn) => ({ ...turn, status: 'done' }))
      } catch (caught) {
        if (!isCurrent()) return
        if (controller.signal.aborted) {
          // Stopped by the visitor: keep what was written so far, or drop an empty turn.
          setTurns((current) => {
            const last = current[current.length - 1]
            return last?.output ? [...current.slice(0, -1), { ...last, status: 'done' }] : current.slice(0, -1)
          })
          return
        }
        setTurns(done)
        if (!done.length) setCapture(null)
        if (label === instruction) setPrompt(trimmed)
        setError(toSessionError(caught))
        if (caught instanceof TryRequestError && caught.kind === 'limit') setRemaining(0)
      } finally {
        if (isCurrent()) controllerRef.current = null
      }
    },
    [capture, detach, presetId, turns]
  )

  const stop = useCallback(() => controllerRef.current?.abort(), [])

  return { capture, turns, latest, isStreaming, prompt, setPrompt, presetId, setPresetId, error, remaining, reset, run, stop }
}
