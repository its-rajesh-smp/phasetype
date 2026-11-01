import type { ChatTurn } from '@shared/types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { bridge } from '../../../services/bridge.service'
import { createId } from '../../../utils/id.util'
import type { ConversationTurn, RunInput } from '../types/panel.types'

/** Finished turns with an answer, as history for the next request. Errors and empty stops are left out. */
const toHistory = (turns: ConversationTurn[]): ChatTurn[] =>
  turns
    .filter((turn) => turn.status === 'done' && turn.output.trim())
    .map(({ instruction, output }) => ({ instruction, output }))

/**
 * The panel conversation: every prompt and its streamed answer. Each request sends the earlier turns as history,
 * so follow-ups ("make it shorter") have context. One request runs at a time.
 */
export function useConversation() {
  const [turns, setTurns] = useState<ConversationTurn[]>([])
  const turnsRef = useRef(turns)
  const activeRequestRef = useRef<string | null>(null)

  /** Updates turns and the ref together, so the event listener and actions always see the latest list. */
  const updateTurns = useCallback((update: (turns: ConversationTurn[]) => ConversationTurn[]) => {
    turnsRef.current = update(turnsRef.current)
    setTurns(turnsRef.current)
  }, [])

  const updateTurn = useCallback(
    (requestId: string, update: (turn: ConversationTurn) => ConversationTurn) =>
      updateTurns((current) => current.map((turn) => (turn.requestId === requestId ? update(turn) : turn))),
    [updateTurns]
  )

  useEffect(
    () =>
      bridge.ai.onEvent((event) => {
        if (event.requestId !== activeRequestRef.current) return
        if (event.type === 'delta') {
          updateTurn(event.requestId, (turn) => ({ ...turn, output: turn.output + event.delta }))
          return
        }
        if (event.type === 'status') {
          updateTurn(event.requestId, (turn) => ({ ...turn, progress: event.message }))
          return
        }
        activeRequestRef.current = null
        updateTurn(event.requestId, (turn) =>
          event.type === 'done' ? { ...turn, status: 'done' } : { ...turn, status: 'error', error: event.message }
        )
      }),
    [updateTurn]
  )

  /** Starts the request for a turn, with the turns before it as history. */
  const request = (turn: ConversationTurn, history: ChatTurn[]): void => {
    activeRequestRef.current = turn.requestId
    const { requestId, instruction, label, text, presetId, attachmentIds } = turn
    bridge.ai.run({ requestId, instruction, label, text, presetId, attachmentIds, history })
  }

  /** Stops the running request. A partial answer is kept; a turn with no answer yet is removed. */
  const cancel = useCallback(() => {
    const requestId = activeRequestRef.current
    if (!requestId) return
    bridge.ai.cancel(requestId)
    activeRequestRef.current = null
    updateTurns((current) =>
      current
        .map((turn) => (turn.requestId === requestId ? { ...turn, status: 'done' as const } : turn))
        .filter((turn) => turn.requestId !== requestId || turn.output.trim())
    )
  }, [updateTurns])

  /** Adds a prompt to the conversation and streams its answer. */
  const send = (input: RunInput): void => {
    cancel()
    const turn: ConversationTurn = {
      ...input,
      id: createId(),
      requestId: createId(),
      output: '',
      status: 'streaming',
      error: null,
      progress: null
    }
    const history = toHistory(turnsRef.current)
    updateTurns((current) => [...current, turn])
    request(turn, history)
  }

  /** Asks again for the last answer, with the same prompt and history. */
  const regenerate = (): void => {
    const last = turnsRef.current.at(-1)
    if (!last || activeRequestRef.current) return
    const turn: ConversationTurn = { ...last, requestId: createId(), output: '', status: 'streaming', error: null, progress: null }
    updateTurns((current) => [...current.slice(0, -1), turn])
    request(turn, toHistory(turnsRef.current.slice(0, -1)))
  }

  const reset = useCallback(() => {
    cancel()
    updateTurns(() => [])
  }, [cancel, updateTurns])

  const lastTurn = turns.at(-1) ?? null

  return { turns, lastTurn, send, regenerate, cancel, reset }
}
