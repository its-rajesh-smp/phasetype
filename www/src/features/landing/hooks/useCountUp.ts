import { useEffect, useState } from 'react'

const DURATION_MS = 1200

/** Eases a number from 0 to `target` once `active` turns true. Jumps straight to the target when `instant` is set. */
export function useCountUp(target: number, active: boolean, instant: boolean): number {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active || instant) return

    let frame = 0
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / DURATION_MS, 1)
      setValue(target * (1 - (1 - progress) ** 3))
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [target, active, instant])

  if (instant) return active ? target : 0
  return value
}
