import type { UsageRecord } from '@shared/types'
import { useCallback, useEffect, useState } from 'react'
import { bridge } from '../../../services/bridge.service'
import { toErrorMessage } from '../../../utils/error.util'

/** The saved request history, newest first. Reloads whenever the window comes back into focus, to pick up new requests. */
export function useUsageHistory() {
  const [records, setRecords] = useState<UsageRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      setRecords(await bridge.usage.list())
      setError(null)
    } catch (caught) {
      setError(toErrorMessage(caught, 'Couldn’t load the history.'))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
    const reload = (): void => void load()
    window.addEventListener('focus', reload)
    return () => window.removeEventListener('focus', reload)
  }, [load])

  const clear = async (): Promise<void> => {
    try {
      await bridge.usage.clear()
      setRecords([])
    } catch (caught) {
      setError(toErrorMessage(caught, 'Couldn’t clear the history.'))
    }
  }

  return { records, loading, error, clear }
}
