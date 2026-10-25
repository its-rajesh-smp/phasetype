import { cn } from '../../../utils/cn.util'
import { SETTINGS_TABS } from '../constants/settings.constants'
import type { SettingsTabId } from '../types/settings.types'

interface SettingsToolbarProps {
  active: SettingsTabId
  onChange: (tab: SettingsTabId) => void
}

/** macOS-style preferences toolbar: the window title, then a centred row of icon-over-label tabs. Doubles as the drag area. */
export function SettingsToolbar({ active, onChange }: SettingsToolbarProps): React.JSX.Element {
  return (
    <header className="drag-region flex shrink-0 flex-col items-center border-b border-line bg-surface/40 pt-3 pb-2.5">
      <h1 className="text-[13px] font-semibold text-muted">Settings</h1>
      <div role="tablist" aria-label="Settings" className="mt-2.5 flex items-center gap-1">
        {SETTINGS_TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active === id}
            onClick={() => onChange(id)}
            className={cn(
              'no-drag flex h-[58px] min-w-[76px] flex-col items-center justify-center gap-1 rounded-xl px-3 transition-colors',
              'focus-visible:ring-2 focus-visible:ring-ink/20 focus-visible:outline-none',
              active === id ? 'bg-ink/[0.07] text-ink' : 'text-muted hover:bg-ink/[0.03] hover:text-ink-soft'
            )}
          >
            <Icon className="size-[22px]" strokeWidth={1.6} />
            <span className="text-[12px] font-medium">{label}</span>
          </button>
        ))}
      </div>
    </header>
  )
}
