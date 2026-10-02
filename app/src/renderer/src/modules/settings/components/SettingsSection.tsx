interface SettingsSectionProps {
  title: string
  description?: React.ReactNode
  action?: React.ReactNode
  children?: React.ReactNode
}

/** One settings row: title, description and an optional action on the right, with content below. */
export function SettingsSection({ title, description, action, children }: SettingsSectionProps): React.JSX.Element {
  return (
    <section className="flex flex-col gap-4 py-6 first:pt-0">
      <div className="flex items-start justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-[15px] font-semibold text-ink">{title}</h2>
          {description && <p className="text-[13px] leading-relaxed text-muted">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}
