import { InlineMessage } from '../../../components/ui/InlineMessage'
import { Select } from '../../../components/ui/Select'
import { useSettings } from '../../../hooks/useSettings'
import { useTransientFlag } from '../../../hooks/useTransientFlag'
import { useModels } from '../hooks/useModels'
import { SavedIndicator } from './SavedIndicator'
import { SettingsSection } from './SettingsSection'

/** Settings section for picking the OpenAI model. Keeps the current model in the list even if it is no longer offered. */
export function ModelSetting(): React.JSX.Element {
  const { settings, update } = useSettings()
  const { models, error, isLoading } = useModels(settings?.apiKeyHint ?? null)
  const [saved, flashSaved] = useTransientFlag()
  const current = settings?.model ?? ''
  const options = current && !models.includes(current) ? [current, ...models] : models

  const handleChange = async (model: string): Promise<void> => {
    const result = await update({ model })
    if (result.ok) flashSaved()
  }

  return (
    <SettingsSection
      title="Model"
      description="Smaller models are faster and cheaper; they're plenty for fixing and rephrasing."
      action={<SavedIndicator visible={saved} />}
    >
      <Select
        aria-label="Model"
        options={options}
        value={current}
        disabled={isLoading || options.length === 0}
        onChange={(event) => void handleChange(event.target.value)}
      />
      {error && <InlineMessage tone="error">{error}</InlineMessage>}
    </SettingsSection>
  )
}
