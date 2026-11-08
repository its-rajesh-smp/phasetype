import type { SampleText, Suggestion } from '../types/try.types'

export const PANEL_HOTKEY = ['⌘', '⇧', 'Space'] as const

export const SAMPLE_TEXTS: SampleText[] = [
  {
    id: 'email',
    label: 'Email',
    app: 'Mail — New Message',
    text: `hey priya,

so sorry for the late reply, things been crazy this week. i looked at the proposal and i think its mostly good but the timeline feels to tight for us, can we push the launch by maybe two weeks? let me know what you think and if its ok with your team.

thanks
sam`,
  },
  {
    id: 'slack',
    label: 'Slack message',
    app: 'Slack — #design',
    text: `guys the new onboarding flow is live on staging, can someone have a look before tommorow? i think theres a bug on the last step where the button doesnt do anything on safari but not sure if its just me`,
  },
  {
    id: 'notes',
    label: 'Notes',
    app: 'Notes — Meeting',
    text: `meeting w/ marketing
- q3 budget approved, but only 80% of what we asked
- need to cut one campaign, probably the podcast one
- alex to send revised plan by friday
- next sync in 2 weeks`,
  }
]

/** One-click prompts before the first answer, so nobody has to think of one. Fix is shown ahead of these. */
export const START_SUGGESTIONS: Suggestion[] = [
  { label: 'More professional', instruction: 'Make it more professional and polished. Keep the meaning.' },
  { label: 'Shorter', instruction: 'Make it shorter and more direct. Keep the key points.' },
  { label: 'Friendlier', instruction: 'Make it warmer and friendlier. Keep the meaning.' }
]

/** One-click follow-ups that refine the last answer. */
export const REFINE_SUGGESTIONS: Suggestion[] = [
  { label: 'Shorter', instruction: 'Make it shorter.' },
  { label: 'More formal', instruction: 'Make it more formal.' },
  { label: 'More casual', instruction: 'Make it more casual.' }
]

export const TRY_PLACEHOLDERS = {
  withText: 'Or type your own…',
  withoutText: 'Tell PhaseType what to write… e.g. a thank-you note to my landlord',
  refining: 'Refine it… e.g. add a line about the budget'
} as const
