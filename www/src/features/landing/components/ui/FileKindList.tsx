import { cn } from '@/utils/cn.util'
import { TONE_CLASSES } from '../../constants/tone.constants'
import type { FileKind } from '../../types/landing.types'

/** The kinds of file the panel can read, one row each with the formats it accepts. */
export function FileKindList({ items }: { items: FileKind[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <li key={item.name} className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-3.5 py-3 shadow-card">
            <span className={cn('flex size-9 shrink-0 items-center justify-center rounded-lg text-white', TONE_CLASSES[item.tone].icon)}>
              <Icon aria-hidden className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink">{item.name}</p>
              <p className="text-xs leading-relaxed text-muted">{item.formats}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
