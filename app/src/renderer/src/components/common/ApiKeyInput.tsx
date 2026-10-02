import { OPENAI_API_KEYS_URL } from '../../constants'
import { Field } from '../ui/Field'
import { PasswordInput } from '../ui/PasswordInput'

interface ApiKeyInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  error?: string | null
  disabled?: boolean
  autoFocus?: boolean
}

/** Masked OpenAI API key field with a link to create a key; Enter submits. */
export function ApiKeyInput({ value, onChange, onSubmit, error, disabled, autoFocus }: ApiKeyInputProps): React.JSX.Element {
  return (
    <Field
      label="OpenAI API key"
      htmlFor="api-key"
      error={error}
      hint={
        <>
          Create one at{' '}
          <a href={OPENAI_API_KEYS_URL} target="_blank" rel="noreferrer" className="text-ember underline underline-offset-4">
            platform.openai.com/api-keys
          </a>
        </>
      }
    >
      <PasswordInput
        id="api-key"
        placeholder="sk-…"
        value={value}
        invalid={Boolean(error)}
        disabled={disabled}
        autoFocus={autoFocus}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => event.key === 'Enter' && onSubmit()}
      />
    </Field>
  )
}
