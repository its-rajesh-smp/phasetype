import { useEffect, useState } from 'react'

/** A counter that ticks up every `intervalMs` while `active` is true. */
export function useCycle(active: boolean, intervalMs: number): number {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!active) return
    const timer = setInterval(() => setTick((count) => count + 1), intervalMs)
    return () => clearInterval(timer)
  }, [active, intervalMs])

  return tick
}
