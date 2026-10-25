interface PresetFieldProps {
  label: string
  htmlFor: string
  hint?: string
  children: React.ReactNode
}

/** A labelled field in the preset editor: bold label, optional hint, then the input. */
export function PresetField({ label, htmlFor, hint, children }: PresetFieldProps): React.JSX.Element {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex flex-col gap-0.5">
        <label htmlFor={htmlFor} className="text-[15px] font-semibold text-ink">
          {label}
        </label>
        {hint && <p className="text-[13px] text-muted">{hint}</p>}
      </div>
      {children}
    </div>
  )
}
