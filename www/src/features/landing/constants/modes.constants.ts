import type { WritingMode } from '../types/landing.types'

export const WRITING_MODES: WritingMode[] = [
  {
    id: 'panel',
    name: 'The panel',
    keys: ['⌃', '⌥', 'Space'],
    titleAccent: 'Ask',
    title: 'for anything',
    description: 'A floating panel opens over whatever you are writing in. Type an instruction and watch the result stream in.',
    points: ['Refine the result with a follow-up prompt', 'Paste with ⌘↵ or copy with ⇧⌘C', 'Nothing selected? It writes at your cursor']
  },
  {
    id: 'quick-fix',
    name: 'Quick fix',
    keys: ['⌃', '⌥', 'F'],
    titleAccent: 'Fix it',
    title: 'in place',
    description: 'One hotkey fixes spelling, grammar and punctuation, then pastes it back. No panel, no clicks.',
    points: ['Never takes focus from your app', 'A small pill shows progress, then “Fixed”', 'Press again to cancel']
  }
]
