import { cn } from '@/utils/cn.util'
import type { TryPreset } from '../../types/try.types'

interface PresetChipProps {
  preset: TryPreset
  selected: boolean
  onToggle: () => void
}

/** A toggleable style preset. The selected one sits on the accent. */
export function PresetChip({ preset, selected, onToggle }: PresetChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      title={preset.instructions}
      onClick={onToggle}
      className={cn(
        'h-8 rounded-full border px-3 text-[13px] font-medium transition-colors focus-visible:ring-2 focus-visible:ring-lime-edge focus-visible:outline-none',
        selected ? 'border-lime-edge/70 bg-lime text-ink' : 'border-line bg-canvas/60 text-muted hover:bg-sunken hover:text-ink'
      )}
    >
      {preset.name}
    </button>
  )
}
