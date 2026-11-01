import type { DemoStage } from '../types/demo.types'

export const DEMO_EMAIL = {
  app: 'Mail',
  to: 'Maya Chen',
  subject: 'Re: Thursday launch sync',
  original:
    "hey maya, i cant make thursdays launch sync, theres a clash with the client call. can we moved it to friday morning? let me no.",
  prompt: 'Fix it and make it warmer',
  result:
    "Hi Maya, I'm so sorry, but I can't make Thursday's launch sync because it clashes with a client call. Could we move it to Friday morning instead? Let me know what works for you!"
} as const

export const DEMO_HOTKEY = ['⌘', '⇧', 'Space'] as const

export const DEMO_STAGES: DemoStage[] = [
  { id: 'draft', holdMs: 1600 },
  { id: 'select', holdMs: 1100 },
  { id: 'hotkey', holdMs: 1000 },
  { id: 'prompt', holdMs: 450, stepMs: 45 },
  { id: 'thinking', holdMs: 800 },
  { id: 'stream', holdMs: 900, stepMs: 55 },
  { id: 'paste', holdMs: 800 },
  { id: 'done', holdMs: 3200 }
]

export const DEMO_STEP_LABELS = ['Select', 'Press', 'Ask', 'Paste'] as const

/** Which step label each stage belongs to. */
export const DEMO_STAGE_STEP: Record<DemoStage['id'], number> = {
  draft: 0,
  select: 0,
  hotkey: 1,
  prompt: 2,
  thinking: 2,
  stream: 2,
  paste: 3,
  done: 3
}
