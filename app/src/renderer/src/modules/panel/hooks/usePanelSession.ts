import type { PanelContext } from '@shared/types'
import { useEffect, useState } from 'react'
import { useLatestRef } from '../../../hooks/useLatestRef'
import { bridge } from '../../../services/bridge.service'
import { EMPTY_PANEL_CONTEXT } from '../constants/panel.constants'

/**
 * Each hotkey press starts a new session with fresh context. `sessionId` changes on every
 * open so components can react (e.g. refocus the prompt). `onReset` runs on open and on hide.
 */
export function usePanelSession(onReset: () => void) {
  const [context, setContext] = useState<PanelContext>(EMPTY_PANEL_CONTEXT)
  const [sessionId, setSessionId] = useState(0)
  const onResetRef = useLatestRef(onReset)

  useEffect(() => {
    const offOpen = bridge.panel.onOpen((next) => {
      onResetRef.current()
      setContext(next)
      setSessionId((id) => id + 1)
    })
    const offHide = bridge.panel.onHide(() => onResetRef.current())
    return () => {
      offOpen()
      offHide()
    }
  }, [onResetRef])

  return { context, sessionId }
}
