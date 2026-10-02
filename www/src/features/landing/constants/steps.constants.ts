import type { Step } from '../types/landing.types'

export const STEPS: Step[] = [
  {
    number: '01',
    title: 'Select',
    description: 'Highlight text in Mail, Slack, Notes, your browser, your editor. If you can select it, PhaseType can read it.'
  },
  {
    number: '02',
    title: 'Press',
    description: 'Your hotkey opens a small panel over the app you are in. Ask for anything, or tap Fix the sentence.',
    keys: ['⌃', '⌥', 'Space']
  },
  {
    number: '03',
    title: 'Paste',
    description: 'The result streams in. Paste it over your selection, and your clipboard comes back exactly as it was.',
    keys: ['⌘', '↵']
  }
]
