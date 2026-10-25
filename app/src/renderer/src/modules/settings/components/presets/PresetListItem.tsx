import { NEW_PRESET_NAME } from '@shared/constants'
import type { Preset } from '@shared/types'
import { CircleUserRound } from 'lucide-react'
import { Checkbox } from '../../../../components/ui/Checkbox'
import { cn } from '../../../../utils/cn.util'

interface PresetListItemProps {
  preset: Preset
  selected: boolean
  onSelect: () => void
  onToggle: (enabled: boolean) => void
}

/** One preset row: its name opens it, the checkbox on the right shows it in the panel. */
export function PresetListItem({ preset, selected, onSelect, onToggle }: PresetListItemProps): React.JSX.Element {
  return (
    <li className={cn('flex items-center gap-2 rounded-lg pr-3 transition-colors', selected ? 'bg-ink/[0.07]' : 'hover:bg-ink/[0.03]')}>
      <button
        type="button"
        aria-current={selected}
        onClick={onSelect}
        className={cn(
          'flex h-10 min-w-0 flex-1 items-center gap-2.5 pl-2.5 text-left text-[13.5px] outline-none',
          selected ? 'font-medium text-ink' : 'text-ink-soft',
          !preset.enabled && 'text-subtle'
        )}
      >
        <CircleUserRound className={cn('size-4 shrink-0', selected ? 'text-ink' : 'text-muted')} strokeWidth={1.75} />
        <span className="truncate">{preset.name || NEW_PRESET_NAME}</span>
      </button>
      <Checkbox checked={preset.enabled} label={`Show ${preset.name} in the panel`} onChange={onToggle} />
    </li>
  )
}
