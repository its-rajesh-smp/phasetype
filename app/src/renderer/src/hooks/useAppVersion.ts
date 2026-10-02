import { useEffect, useState } from 'react'
import { bridge } from '../services/bridge.service'

/** Fetches the app version from the main process; null until it arrives. */
export function useAppVersion(): string | null {
  const [version, setVersion] = useState<string | null>(null)
  useEffect(() => {
    void bridge.app.getVersion().then(setVersion)
  }, [])
  return version
}
