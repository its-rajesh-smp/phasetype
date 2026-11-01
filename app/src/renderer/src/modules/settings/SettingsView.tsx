import { useState } from 'react'
import { SettingsToolbar } from './components/SettingsToolbar'
import { GeneralTab } from './components/tabs/GeneralTab'
import { HotkeysTab } from './components/tabs/HotkeysTab'
import { PresetsTab } from './components/tabs/PresetsTab'
import { UsageTab } from './components/tabs/UsageTab'
import type { SettingsTabId } from './types/settings.types'

const TAB_VIEWS: Record<SettingsTabId, () => React.JSX.Element> = {
  general: GeneralTab,
  hotkeys: HotkeysTab,
  presets: PresetsTab,
  usage: UsageTab
}

/** Settings window: a toolbar of tabs on top, the selected tab's content below. */
export function SettingsView(): React.JSX.Element {
  const [tab, setTab] = useState<SettingsTabId>('general')
  const TabView = TAB_VIEWS[tab]

  return (
    <div className="flex h-full flex-col">
      <SettingsToolbar active={tab} onChange={setTab} />
      <main className="flex min-h-0 flex-1 flex-col">
        <TabView />
      </main>
    </div>
  )
}
