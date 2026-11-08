'use client'

import { Check } from 'lucide-react'
import { useState } from 'react'
import { useInView } from '@/hooks/useInView'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/utils/cn.util'
import { ACTIVITY_TIMES } from '../../constants/features.constants'
import { useCycle } from '../../hooks/useCycle'
import type { ActivityItem } from '../../types/landing.types'

const CYCLE_MS = 2800

/** A live feed of recent rewrites in different apps. A new one arrives every few seconds while on screen; hovering pauses it. */
export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  const [ref, inView] = useInView<HTMLUListElement>()
  const [paused, setPaused] = useState(false)
  const reducedMotion = usePrefersReducedMotion()
  const tick = useCycle(inView && !paused && !reducedMotion, CYCLE_MS)

  const visible = ACTIVITY_TIMES.map((time, row) => ({ time, item: items[(tick - row + items.length * ACTIVITY_TIMES.length) % items.length] }))

  return (
    <ul
      ref={ref}
      className="flex flex-col gap-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {visible.map(({ time, item }, row) => (
        <li
          key={`${item.app}-${item.action}`}
          className={cn(
            'flex items-center gap-3 rounded-2xl border border-white bg-surface/90 px-3.5 py-2.5 shadow-card transition duration-200 hover:translate-x-1 hover:bg-surface',
            row === 0 && tick > 0 && 'animate-pop-in'
          )}
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-mint-ink text-white">
            <Check aria-hidden className={cn('size-4', row === 0 && tick > 0 && 'animate-pop-in [animation-delay:180ms]')} strokeWidth={3} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">
              {item.action} <span className="font-normal text-subtle">· {time}</span>
            </p>
            <p className="truncate text-xs text-muted">
              {item.app} · {item.detail}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
