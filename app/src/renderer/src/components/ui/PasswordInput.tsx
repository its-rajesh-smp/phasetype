import { Eye, EyeOff } from 'lucide-react'
import { useState, type InputHTMLAttributes, type Ref } from 'react'
import { TextInput } from './TextInput'

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  invalid?: boolean
  ref?: Ref<HTMLInputElement>
}

/** Text input that hides its value, with an eye button to toggle visibility. */
export function PasswordInput(props: PasswordInputProps): React.JSX.Element {
  const [visible, setVisible] = useState(false)
  const Icon = visible ? EyeOff : Eye

  return (
    <TextInput
      {...props}
      type={visible ? 'text' : 'password'}
      className="font-mono"
      trailing={
        <button
          type="button"
          onClick={() => setVisible((value) => !value)}
          className="text-subtle transition-colors hover:text-ink"
          aria-label={visible ? 'Hide key' : 'Show key'}
        >
          <Icon className="size-4" />
        </button>
      }
    />
  )
}
