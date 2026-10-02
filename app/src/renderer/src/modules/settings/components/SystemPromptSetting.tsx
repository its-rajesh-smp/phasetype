import { DEFAULT_SYSTEM_PROMPT } from '@shared/constants'
import { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/Button'
import { TextArea } from '../../../components/ui/TextArea'
import { useSettings } from '../../../hooks/useSettings'
import { useTransientFlag } from '../../../hooks/useTransientFlag'
import { SavedIndicator } from './SavedIndicator'
import { SettingsSection } from './SettingsSection'

/** Settings section for editing the system prompt. Saving an empty prompt restores the default. */
export function SystemPromptSetting(): React.JSX.Element {
  const { settings, update } = useSettings()
  const savedPrompt = settings?.systemPrompt ?? ''
  const [draft, setDraft] = useState(savedPrompt)
  const [saving, setSaving] = useState(false)
  const [saved, flashSaved] = useTransientFlag()

  useEffect(() => setDraft(savedPrompt), [savedPrompt])

  const handleSave = async (): Promise<void> => {
    setSaving(true)
    const result = await update({ systemPrompt: draft.trim() || DEFAULT_SYSTEM_PROMPT })
    setSaving(false)
    if (result.ok) flashSaved()
  }

  return (
    <SettingsSection
      title="System prompt"
      description="Background instructions sent with every request: your tone, language, or things to always avoid."
      action={<SavedIndicator visible={saved} />}
    >
      <TextArea rows={5} value={draft} onChange={(event) => setDraft(event.target.value)} />
      <div className="flex items-center justify-between">
        <Button variant="link" disabled={draft === DEFAULT_SYSTEM_PROMPT} onClick={() => setDraft(DEFAULT_SYSTEM_PROMPT)}>
          Reset to default
        </Button>
        <Button variant="primary" size="sm" loading={saving} disabled={draft === savedPrompt} onClick={() => void handleSave()}>
          Save prompt
        </Button>
      </div>
    </SettingsSection>
  )
}
