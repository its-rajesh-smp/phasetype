import { pickDefaultModel } from '@shared/utils'
import { useCallback, useState } from 'react'
import { bridge } from '../services/bridge.service'
import type { AsyncStatus } from '../types'
import { useSettings } from './useSettings'

/** Verifies an API key with the provider, then saves it together with a usable model. */
export function useConnectApiKey() {
  const { settings, update } = useSettings()
  const [status, setStatus] = useState<AsyncStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const connect = useCallback(
    async (rawKey: string): Promise<boolean> => {
      const apiKey = rawKey.trim()
      if (!apiKey) {
        setStatus('error')
        setError('Paste your OpenAI API key.')
        return false
      }

      setStatus('loading')
      setError(null)
      const verified = await bridge.ai.verifyKey(apiKey)
      const saved = verified.ok
        ? await update({ apiKey, model: pickDefaultModel(verified.data, settings?.model) })
        : verified

      if (!saved.ok) {
        setStatus('error')
        setError(saved.error)
        return false
      }
      setStatus('success')
      return true
    },
    [settings?.model, update]
  )

  const reset = useCallback(() => {
    setStatus('idle')
    setError(null)
  }, [])

  return { connect, reset, error, isConnecting: status === 'loading' }
}
