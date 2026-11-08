import featureClipboard from '@/assets/images/feature-clipboard.webp'
import featureWrite from '@/assets/images/feature-write.webp'
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
import type { ActivityItem, Feature, HotkeyItem, PresetItem, TakenHotkey, ThreadMessage, UsageItem } from '../types/landing.types'

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
    tone: 'violet',
    visual: 'thread'
  },
  {
    icon: PenLine,
    title: 'Writes from nothing',
    description: 'With nothing selected, describe what you need and it pastes at your cursor.',
    tone: 'plain',
    image: featureWrite
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
    tone: 'plain',
    image: featureClipboard
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

/** Example rewrites cycled through the "works in every app" tile, newest first. */
export const ACTIVITY_ITEMS: ActivityItem[] = [
  { app: 'Mail', action: 'Fixed 4 typos', detail: 'Re: Thursday launch sync' },
  { app: 'Slack', action: 'Made it friendlier', detail: '#design-review' },
  { app: 'Notion', action: 'Shortened by half', detail: 'Q3 planning doc' },
  { app: 'Xcode', action: 'Explained this function', detail: 'SessionStore.swift' },
  { app: 'Safari', action: 'Translated to Spanish', detail: 'Support form' },
  { app: 'Linear', action: 'Wrote the summary', detail: 'Bug report' }
]

/** Relative times for the visible feed rows, top to bottom. */
export const ACTIVITY_TIMES = ['just now', '2m ago', '9m ago'] as const

/** A short back-and-forth played in the conversation tile. */
export const THREAD_MESSAGES: ThreadMessage[] = [
  { from: 'you', text: 'Turn this into a standup update' },
  { from: 'phasetype', text: 'Shipped the onboarding fix. Today I am reviewing the billing page.' },
  { from: 'you', text: 'Mention I am blocked on design' },
  { from: 'phasetype', text: 'Shipped the onboarding fix. Billing review is blocked on final designs.' }
]

/** Default shortcuts shown in the "hotkeys you choose" tile. */
export const HOTKEY_ITEMS: HotkeyItem[] = [
  { name: 'Open the panel', keys: ['⌘', '⇧', 'Space'] },
  { name: 'Quick fix', keys: ['⌥', '⇧', 'Space'] }
]

/** Well-known shortcuts the hotkey tile reports as taken when a visitor records one. */
export const TAKEN_HOTKEYS: TakenHotkey[] = [
  { keys: ['⌘', 'Space'], owner: 'Spotlight' },
  { keys: ['⌃', 'Space'], owner: 'Input sources' },
  { keys: ['⌘', 'C'], owner: 'Copy' },
  { keys: ['⌘', 'V'], owner: 'Paste' },
  { keys: ['⌘', 'X'], owner: 'Cut' },
  { keys: ['⌘', 'Z'], owner: 'Undo' },
  { keys: ['⌘', 'A'], owner: 'Select all' },
  { keys: ['⌘', 'S'], owner: 'Save' },
  { keys: ['⌘', 'F'], owner: 'Find' },
  { keys: ['⌘', 'P'], owner: 'Print' },
  { keys: ['⌘', 'Tab'], owner: 'App switcher' },
  { keys: ['⌘', '⇧', '3'], owner: 'Screenshot' },
  { keys: ['⌘', '⇧', '4'], owner: 'Screenshot' },
  { keys: ['⌘', '⇧', '5'], owner: 'Screenshot' }
]

/** Presets shown in the preset picker tile. The first two ship with the app. */
export const PRESET_ITEMS: PresetItem[] = [
  { name: 'Slack reply', instructions: 'Short and casual, no greeting or sign-off' },
  { name: 'Email reply', instructions: 'Clear and polite, with a greeting and sign-off' },
  { name: 'Client update', instructions: 'Confident, plain words, lead with the outcome' }
]

/** Example rows for the usage tile, one per model. */
export const USAGE_ITEMS: UsageItem[] = [
  { model: 'gpt-5-mini', detail: '142 requests', cost: 0.31 },
  { model: 'gpt-4o-mini-transcribe', detail: '2 recordings', cost: 0.18 },
  { model: 'gpt-4.1', detail: '9 requests', cost: 0.12 }
]
