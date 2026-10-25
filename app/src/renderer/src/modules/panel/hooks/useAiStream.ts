import { useCallback, useEffect, useRef, useState } from 'react'
import { bridge } from '../../../services/bridge.service'
import { createId } from '../../../utils/id.util'
import type { RunInput, StreamStatus } from '../types/panel.types'

/** Runs one AI request at a time and accumulates the streamed text. */
export function useAiStream() {
  const [status, setStatus] = useState<StreamStatus>('idle')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const requestIdRef = useRef<string | null>(null)
  const outputRef = useRef('')

  useEffect(
    () =>
      bridge.ai.onEvent((event) => {
        if (event.requestId !== requestIdRef.current) return
        if (event.type === 'delta') {
          outputRef.current += event.delta
          setOutput(outputRef.current)
        } else {
          requestIdRef.current = null
          if (event.type === 'done') setStatus('done')
          else {
            setError(event.message)
            setStatus('error')
          }
        }
      }),
    []
  )

  const cancel = useCallback(() => {
    if (!requestIdRef.current) return
    bridge.ai.cancel(requestIdRef.current)
    requestIdRef.current = null
    setStatus(outputRef.current ? 'done' : 'idle')
  }, [])

  const run = useCallback(
    ({ instruction, text, presetId }: RunInput) => {
      cancel()
      const requestId = createId()
      requestIdRef.current = requestId
      outputRef.current = ''
      setOutput('')
      setError(null)
      setStatus('streaming')
      bridge.ai.run({ requestId, instruction, text, presetId })
    },
    [cancel]
  )

  const reset = useCallback(() => {
    cancel()
    outputRef.current = ''
    setOutput('')
    setError(null)
    setStatus('idle')
  }, [cancel])

  return { status, output, error, run, cancel, reset }
}
