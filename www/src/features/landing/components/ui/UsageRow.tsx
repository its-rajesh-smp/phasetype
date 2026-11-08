import { Cpu } from 'lucide-react'
import { cn } from '@/utils/cn.util'
import { useCountUp } from '../../hooks/useCountUp'
import type { UsageItem } from '../../types/landing.types'

interface UsageRowProps {
  item: UsageItem
  /** This row's cost as a share of the largest, 0 to 1. */
  share: number
  active: boolean
  instant: boolean
}

const BAR_WIDTHS = ['w-0', 'w-1/4', 'w-2/4', 'w-3/4', 'w-full'] as const

/** One model's usage, with its cost counting up and a bar filling to its share of the total. */
export function UsageRow({ item, share, active, instant }: UsageRowProps) {
  const cost = useCountUp(item.cost, active, instant)
  const barWidth = active ? BAR_WIDTHS[Math.max(1, Math.round(share * 4))] : BAR_WIDTHS[0]

  return (
    <li className="group/row relative flex items-center gap-3 overflow-hidden rounded-2xl border border-white bg-surface/90 px-3.5 py-2.5 shadow-card transition duration-200 hover:translate-x-1 hover:bg-surface">
      <span aria-hidden className={cn('absolute inset-y-0 left-0 bg-violet-tint transition-[width] duration-[1200ms] ease-out', barWidth)} />
      <span className="relative flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-ink text-white transition-transform duration-200 group-hover/row:rotate-12">
        <Cpu aria-hidden className="size-4" />
      </span>
      <div className="relative min-w-0 flex-1">
        <p className="truncate font-mono text-sm text-ink">{item.model}</p>
        <p className="truncate text-xs text-muted">{item.detail}</p>
      </div>
      <span className="relative font-mono text-sm text-ink tabular-nums">${cost.toFixed(2)}</span>
    </li>
  )
}
