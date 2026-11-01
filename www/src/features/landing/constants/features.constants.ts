import {
  AppWindow,
  BookmarkCheck,
  ChartNoAxesColumn,
  ClipboardCheck,
  Keyboard,
  MessageSquareText,
  PenLine,
  SquareMenu
} from 'lucide-react'
import type { ActivityItem, Feature, HotkeyItem, PresetItem, UsageItem } from '../types/landing.types'

/** Ordered so every row of the four-column bento is full: wide tiles span two columns. */
export const FEATURES: Feature[] = [
  {
    icon: AppWindow,
    title: 'Works in every Mac app',
    description:
      'Mail, Slack, Notion, Xcode, a form in your browser. PhaseType reads your selection through macOS Accessibility, so there is nothing to install per app.',
    tone: 'mint',
    wide: true,
    visual: 'activity'
  },
  {
    icon: MessageSquareText,
    title: 'A conversation, not a one-shot',
    description: 'Results stream in as they are written. Not quite right? Reply, and it refines with the whole thread in mind.',
    tone: 'violet'
  },
  {
    icon: PenLine,
    title: 'Writes from nothing',
    description: 'With nothing selected, describe what you need and it pastes at your cursor.',
    tone: 'plain'
  },
  {
    icon: BookmarkCheck,
    title: 'Presets for every voice',
    description: 'Save how you write a Slack reply or a client email, plus a few facts about you. Press ⌘P in the panel to apply one.',
    tone: 'peach',
    wide: true,
    visual: 'presets'
  },
  {
    icon: ClipboardCheck,
    title: 'Your clipboard, untouched',
    description: 'Where apps allow it, PhaseType reads and replaces text directly. Elsewhere it borrows the clipboard and puts it back.',
    tone: 'plain'
  },
  {
    icon: SquareMenu,
    title: 'Lives in the menu bar',
    description: 'No dock icon, no window to manage. Optionally opens at login.',
    tone: 'sky'
  },
  {
    icon: Keyboard,
    title: 'Hotkeys you choose',
    description: 'Record any shortcut. PhaseType checks that no other app is already using it.',
    tone: 'sky',
    wide: true,
    visual: 'hotkeys'
  },
  {
    icon: ChartNoAxesColumn,
    title: 'Any model, every cent counted',
    description:
      'Pick any chat model your key can use. Settings shows the tokens and estimated cost of each request, kept only on your Mac.',
    tone: 'violet',
    wide: true,
    visual: 'usage'
  }
]

/** Example rewrites shown in the "works in every app" tile. */
export const ACTIVITY_ITEMS: ActivityItem[] = [
  { app: 'Mail', action: 'Fixed 4 typos', detail: 'Re: Thursday launch sync', time: 'just now' },
  { app: 'Slack', action: 'Made it friendlier', detail: '#design-review', time: '2m ago' },
  { app: 'Notion', action: 'Shortened by half', detail: 'Q3 planning doc', time: '9m ago' }
]

/** Default shortcuts shown in the "hotkeys you choose" tile. */
export const HOTKEY_ITEMS: HotkeyItem[] = [
  { name: 'Open the panel', keys: ['⌘', '⇧', 'Space'] },
  { name: 'Quick fix', keys: ['⌥', '⇧', 'Space'] }
]

/** Presets shown in the preset picker tile. The first two ship with the app. */
export const PRESET_ITEMS: PresetItem[] = [
  { name: 'Slack reply', instructions: 'Short and casual, no greeting or sign-off', selected: true },
  { name: 'Email reply', instructions: 'Clear and polite, with a greeting and sign-off' },
  { name: 'Client update', instructions: 'Confident, plain words, lead with the outcome' }
]

/** Example rows for the usage tile, one per model. */
export const USAGE_ITEMS: UsageItem[] = [
  { model: 'gpt-5-mini', detail: '142 requests', cost: '$0.31' },
  { model: 'gpt-4o-mini-transcribe', detail: '2 recordings', cost: '$0.18' },
  { model: 'gpt-4.1', detail: '9 requests', cost: '$0.12' }
]
