import type { TryPreset } from '../../types/try.types'
import { PresetChip } from './PresetChip'

interface PanelStyleRowProps {
  presets: TryPreset[]
  presetId: string | null
  disabled: boolean
  onPresetChange: (id: string | null) => void
}

/** The saved writing styles that apply on top of any prompt. */
export function PanelStyleRow({ presets, presetId, disabled, onPresetChange }: PanelStyleRowProps) {
  return (
    <div className="flex items-center gap-2 px-4 pb-3">
      <span id="preset-label" className="text-[12px] font-medium text-subtle">
        Style
      </span>
      <fieldset aria-labelledby="preset-label" disabled={disabled} className="flex gap-1.5 disabled:opacity-40">
        {presets.map((preset) => (
          <PresetChip
            key={preset.id}
            preset={preset}
            selected={preset.id === presetId}
            onToggle={() => onPresetChange(preset.id === presetId ? null : preset.id)}
          />
        ))}
      </fieldset>
    </div>
  )
}
