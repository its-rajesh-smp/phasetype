import type { QuickFixStatus } from '@shared/types'
import { useEffect, useState } from 'react'
import { bridge } from '../../../services/bridge.service'

/** The status the main process wants the pill to show, or null while it is hidden. */
export function useQuickFixStatus(): QuickFixStatus | null {
  const [status, setStatus] = useState<QuickFixStatus | null>(null)
  useEffect(() => bridge.status.onUpdate(setStatus), [])
  return status
}
