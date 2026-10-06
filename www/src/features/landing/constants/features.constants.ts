import {
  AppWindow,
  ClipboardCheck,
  Keyboard,
  MessageSquareText,
  PenLine,
  SlidersHorizontal,
  Sparkles,
  SquareMenu
} from 'lucide-react'
import type { ActivityItem, Feature, HotkeyItem } from '../types/landing.types'

export const FEATURES: Feature[] = [
  {
    icon: AppWindow,
    title: 'Works in every Mac app',
    description:
      'Mail, Slack, Notion, Xcode, a form in your browser. PhaseType reads your selection with a plain ⌘C, so there is nothing to install per app.',
    tone: 'mint',
    wide: true,
    visual: 'activity'
  },
  {
    icon: Sparkles,
    title: 'Streams as it writes',
    description: 'Words appear as the model writes them. Stop any time with esc.',
    tone: 'violet'
  },
  {
    icon: MessageSquareText,
    title: 'Refine in a loop',
    description: 'Not quite right? Type another prompt and it applies to the result.',
    tone: 'plain'
  },
  {
    icon: PenLine,
    title: 'Writes from nothing',
    description: 'With nothing selected, describe what you need and it pastes at your cursor.',
    tone: 'plain'
  },
  {
    icon: ClipboardCheck,
    title: 'Your clipboard, untouched',
    description: 'PhaseType borrows the clipboard to copy and paste, then puts back whatever was there.',
    tone: 'peach'
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
    icon: SlidersHorizontal,
    title: 'Your model, your voice',
    description: 'Pick any chat model your key can use and set a system prompt that sounds like you.',
    tone: 'violet',
    wide: true
  },
  {
    icon: SquareMenu,
    title: 'Lives in the menu bar',
    description: 'No dock icon, no window to manage. Optionally opens at login.',
    tone: 'plain',
    wide: true
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
  { name: 'Open the panel', keys: ['⌃', '⌥', 'Space'] },
  { name: 'Quick fix', keys: ['⌃', '⌥', 'F'] }
]
