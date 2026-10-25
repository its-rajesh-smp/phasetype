import { useState } from 'react'
import { usePresets } from '../../hooks/usePresets'
import { PresetEditor } from '../presets/PresetEditor'
import { PresetList } from '../presets/PresetList'
import { PresetsEmptyState } from '../presets/PresetsEmptyState'

/** Presets: a list of saved styles beside an editor for the selected one, filling the window. */
export function PresetsTab(): React.JSX.Element {
  const { presets, add, change, remove } = usePresets()
  const [selectedId, setSelectedId] = useState<string | null>(presets[0]?.id ?? null)
  const selected = presets.find((preset) => preset.id === selectedId) ?? presets[0] ?? null

  const handleRemove = (): void => {
    if (!selected || !window.confirm(`Delete the "${selected.name}" preset?`)) return
    const index = presets.indexOf(selected)
    const neighbour = presets[index + 1] ?? presets[index - 1] ?? null
    setSelectedId(neighbour?.id ?? null)
    void remove(selected.id)
  }

  return (
    <div className="flex min-h-0 flex-1">
      <PresetList
        presets={presets}
        selectedId={selected?.id ?? null}
        onSelect={setSelectedId}
        onToggle={(id, enabled) => void change(id, { enabled })}
        onAdd={() => setSelectedId(add())}
        onRemove={handleRemove}
      />
      {selected ? (
        <PresetEditor key={selected.id} preset={selected} onSave={(draft) => change(selected.id, draft)} />
      ) : (
        <PresetsEmptyState onAdd={() => setSelectedId(add())} />
      )}
    </div>
  )
}
