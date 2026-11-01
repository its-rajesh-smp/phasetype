import type { Step } from '../types/landing.types'

export const STEPS: Step[] = [
  {
    number: '01',
    title: 'Select',
    description: 'Highlight text in Mail, Slack, Notes, your browser, your editor, or pick files in Finder. If you can select it, PhaseType can read it.',
    illustration: 'select'
  },
  {
    number: '02',
    title: 'Press',
    description: 'Your hotkey opens a small panel over the app you are in. Ask for anything, tap Fix the sentence, or pick a preset.',
    illustration: 'press'
  },
  {
    number: '03',
    title: 'Paste',
    description: 'The result streams in. Paste it over your selection or copy it, and your clipboard stays exactly as it was.',
    illustration: 'paste'
  }
]
