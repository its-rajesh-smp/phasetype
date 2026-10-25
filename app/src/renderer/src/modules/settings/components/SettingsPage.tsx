/** Scrollable tab body with a centred column of settings sections. */
export function SettingsPage({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-10 pt-8 pb-8">
      <div className="mx-auto flex w-full max-w-xl flex-col divide-y divide-line">{children}</div>
    </div>
  )
}
