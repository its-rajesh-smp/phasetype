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
import type { Feature } from '../types/landing.types'

export const FEATURES: Feature[] = [
  {
    icon: AppWindow,
    title: 'Works in every Mac app',
    description:
      'Mail, Slack, Notion, Xcode, a form in your browser. PhaseType reads your selection with a plain ⌘C, so there is nothing to install per app.',
    wide: true
  },
  {
    icon: Sparkles,
    title: 'Streams as it writes',
    description: 'Words appear as the model writes them. Stop any time with esc.'
  },
  {
    icon: MessageSquareText,
    title: 'Refine in a loop',
    description: 'Not quite right? Type another prompt and it applies to the result.'
  },
  {
    icon: PenLine,
    title: 'Writes from nothing',
    description: 'With nothing selected, describe what you need and it pastes at your cursor.'
  },
  {
    icon: ClipboardCheck,
    title: 'Your clipboard, untouched',
    description: 'PhaseType borrows the clipboard to copy and paste, then puts back whatever was there.'
  },
  {
    icon: Keyboard,
    title: 'Hotkeys you choose',
    description: 'Record any shortcut. PhaseType checks that no other app is already using it.',
    wide: true
  },
  {
    icon: SlidersHorizontal,
    title: 'Your model, your voice',
    description: 'Pick any chat model your key can use and set a system prompt that sounds like you.',
    wide: true
  },
  {
    icon: SquareMenu,
    title: 'Lives in the menu bar',
    description: 'No dock icon, no window to manage. Optionally opens at login.',
    wide: true
  }
]
