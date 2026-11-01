import { ChartNoAxesColumn, CircleUserRound, Command, Settings, type LucideIcon } from 'lucide-react'
import type { SettingsTabId } from '../types/settings.types'

/** Tabs in the settings toolbar, in order. Add an entry here (and a view in SettingsView) for a new tab. */
export const SETTINGS_TABS: { id: SettingsTabId; label: string; Icon: LucideIcon }[] = [
  { id: 'general', label: 'General', Icon: Settings },
  { id: 'hotkeys', label: 'Hotkeys', Icon: Command },
  { id: 'presets', label: 'Presets', Icon: CircleUserRound },
  { id: 'usage', label: 'Usage', Icon: ChartNoAxesColumn }
]

/** History entries shown at first, and added by each "Show more". */
export const USAGE_HISTORY_PAGE_SIZE = 50
