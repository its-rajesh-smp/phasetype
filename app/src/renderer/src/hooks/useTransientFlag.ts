import { useCallback, useEffect, useRef, useState } from 'react'
import { FEEDBACK_DURATION_MS } from '../constants'

/** A boolean that switches on when triggered and back off after a moment, e.g. for "Copied". */
export function useTransientFlag(durationMs = FEEDBACK_DURATION_MS): [boolean, () => void] {
  const [active, setActive] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined)

  const trigger = useCallback(() => {
    clearTimeout(timeout.current)
    setActive(true)
    timeout.current = setTimeout(() => setActive(false), durationMs)
  }, [durationMs])

  useEffect(() => () => clearTimeout(timeout.current), [])

  return [active, trigger]
}
