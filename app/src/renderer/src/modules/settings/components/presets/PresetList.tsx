import type { Preset } from '@shared/types'
import { Minus, Plus } from 'lucide-react'
import { PresetListItem } from './PresetListItem'

interface PresetListProps {
  presets: Preset[]
  selectedId: string | null
  onSelect: (id: string) => void
  onToggle: (id: string, enabled: boolean) => void
  onAdd: () => void
  onRemove: () => void
}

const FOOTER_BUTTON_CLASSES =
  'flex size-7 items-center justify-center rounded-md text-muted transition-colors hover:bg-ink/5 hover:text-ink disabled:pointer-events-none disabled:opacity-40'

/** Sidebar listing every preset under a column header, with add and remove buttons underneath. */
export function PresetList({ presets, selectedId, onSelect, onToggle, onAdd, onRemove }: PresetListProps): React.JSX.Element {
  return (
    <div className="flex w-64 shrink-0 flex-col border-r border-line bg-surface/30">
      <div className="flex h-10 shrink-0 items-center justify-between border-b border-line px-4 text-[12px] font-medium text-subtle">
        <span>Preset</span>
        <span>In panel</span>
      </div>
      <ul className="min-h-0 flex-1 overflow-y-auto p-2">
        {presets.map((preset) => (
          <PresetListItem
            key={preset.id}
            preset={preset}
            selected={preset.id === selectedId}
            onSelect={() => onSelect(preset.id)}
            onToggle={(enabled) => onToggle(preset.id, enabled)}
          />
        ))}
      </ul>
      <div className="flex shrink-0 items-center gap-1 border-t border-line px-2 py-1.5">
        <button type="button" aria-label="Add preset" onClick={onAdd} className={FOOTER_BUTTON_CLASSES}>
          <Plus className="size-4" />
        </button>
        <span aria-hidden className="h-4 w-px bg-line" />
        <button type="button" aria-label="Remove preset" disabled={!selectedId} onClick={onRemove} className={FOOTER_BUTTON_CLASSES}>
          <Minus className="size-4" />
        </button>
      </div>
    </div>
  )
}
