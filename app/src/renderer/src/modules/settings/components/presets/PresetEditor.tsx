import type { Preset } from '@shared/types'
import { KeyCombo } from '../../../../components/ui/KeyCombo'
import { TextArea } from '../../../../components/ui/TextArea'
import { TextInput } from '../../../../components/ui/TextInput'
import { PRESET_PICKER_SHORTCUT } from '../../../../constants'
import { usePresetDraft } from '../../hooks/usePresetDraft'
import type { PresetDraft } from '../../types/settings.types'
import { SavedIndicator } from '../SavedIndicator'
import { PresetField } from './PresetField'

interface PresetEditorProps {
  preset: Preset
  onSave: (draft: PresetDraft) => Promise<{ ok: boolean }>
}

/** Detail pane for a preset's name, response style and details about the user. Saves as you type. */
export function PresetEditor({ preset, onSave }: PresetEditorProps): React.JSX.Element {
  const { draft, change, flush, saved } = usePresetDraft(preset, onSave)

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="flex h-10 shrink-0 items-center justify-between border-b border-line px-6">
        <span className="flex items-center gap-1.5 text-[12px] text-subtle">
          Pick it in the panel with <KeyCombo accelerator={PRESET_PICKER_SHORTCUT} />
        </span>
        <SavedIndicator visible={saved} />
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-6 pt-6 pb-8">
        <PresetField label="Preset name" htmlFor="preset-name">
          <TextInput
            id="preset-name"
            value={draft.name}
            placeholder="e.g. Slack reply"
            onChange={(event) => change('name', event.target.value)}
            onBlur={flush}
          />
        </PresetField>
        <PresetField label="How should PhaseType respond?" htmlFor="preset-instructions" hint="Tone, length, structure, words to avoid.">
          <TextArea
            id="preset-instructions"
            rows={8}
            value={draft.instructions}
            placeholder={'Writing style: concise, professional yet friendly\nTone: confident and warm'}
            onChange={(event) => change('instructions', event.target.value)}
            onBlur={flush}
          />
        </PresetField>
        <PresetField label="About you" htmlFor="preset-about" hint="Details it can use, like your name, role or sign-off.">
          <TextArea
            id="preset-about"
            rows={4}
            value={draft.about}
            placeholder={'Name: Alex Smith\nRole: Freelance designer'}
            onChange={(event) => change('about', event.target.value)}
            onBlur={flush}
          />
        </PresetField>
      </div>
    </div>
  )
}
