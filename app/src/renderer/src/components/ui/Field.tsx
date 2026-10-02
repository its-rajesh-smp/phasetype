import { InlineMessage } from './InlineMessage'

interface FieldProps {
  label: string
  htmlFor?: string
  hint?: React.ReactNode
  error?: string | null
  children: React.ReactNode
}

/** Labelled form field wrapper that shows an error message, or a hint when there is no error. */
export function Field({ label, htmlFor, hint, error, children }: FieldProps): React.JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-[13px] font-medium text-ink-soft">
        {label}
      </label>
      {children}
      {error ? <InlineMessage tone="error">{error}</InlineMessage> : hint && <div className="text-[13px] text-muted">{hint}</div>}
    </div>
  )
}
