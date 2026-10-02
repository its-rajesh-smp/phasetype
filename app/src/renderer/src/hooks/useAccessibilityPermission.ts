import { useCallback, useEffect, useState } from 'react'
import { PERMISSION_POLL_INTERVAL_MS } from '../constants'
import { bridge } from '../services/bridge.service'

/** Tracks macOS Accessibility access, re-checking while the window is open (it changes in System Settings). */
export function useAccessibilityPermission() {
  const [granted, setGranted] = useState<boolean | null>(null)

  const refresh = useCallback(async () => {
    setGranted(await bridge.permissions.isAccessibilityGranted())
  }, [])

  useEffect(() => {
    void refresh()
    const interval = setInterval(() => void refresh(), PERMISSION_POLL_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [refresh])

  const request = useCallback(async () => {
    setGranted(await bridge.permissions.requestAccessibility())
  }, [])

  return { granted, request }
}
