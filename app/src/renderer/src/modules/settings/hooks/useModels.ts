import { useEffect, useState } from 'react'
import { bridge } from '../../../services/bridge.service'
import type { AsyncStatus } from '../../../types'

/** Loads the chat models the saved key can use. Reloads when the key changes. */
export function useModels(apiKeyHint: string | null) {
  const [models, setModels] = useState<string[]>([])
  const [status, setStatus] = useState<AsyncStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!apiKeyHint) return
    let cancelled = false
    setStatus('loading')
    setError(null)

    void bridge.ai.verifyKey().then((result) => {
      if (cancelled) return
      if (result.ok) {
        setModels(result.data)
        setStatus('success')
      } else {
        setError(result.error)
        setStatus('error')
      }
    })

    return () => {
      cancelled = true
    }
  }, [apiKeyHint])

  return { models, error, isLoading: status === 'loading' }
}
