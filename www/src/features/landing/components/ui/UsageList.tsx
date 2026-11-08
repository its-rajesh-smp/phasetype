'use client'

import { useInView } from '@/hooks/useInView'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import type { UsageItem } from '../../types/landing.types'
import { UsageRow } from './UsageRow'

/** Settings › Usage in miniature: requests and estimated cost per model, counting up when scrolled into view. */
export function UsageList({ items }: { items: UsageItem[] }) {
  const [ref, inView] = useInView<HTMLUListElement>(true)
  const reducedMotion = usePrefersReducedMotion()
  const maxCost = Math.max(...items.map((item) => item.cost))

  return (
    <ul ref={ref} className="flex flex-col gap-2">
      {items.map((item) => (
        <UsageRow key={item.model} item={item} share={item.cost / maxCost} active={inView} instant={reducedMotion} />
      ))}
    </ul>
  )
}
