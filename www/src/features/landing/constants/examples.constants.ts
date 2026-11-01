import type { WritingExample } from '../types/landing.types'

export const WRITING_EXAMPLES: WritingExample[] = [
  {
    id: 'fix',
    label: 'Fix grammar',
    app: 'Notes',
    keys: ['⌥', '⇧', 'Space'],
    prompt: 'Fix the sentence',
    before: "Their going to send the the report tomorow, its allmost finished and looks grate.",
    after: "They're going to send the report tomorrow. It's almost finished and looks great."
  },
  {
    id: 'friendlier',
    label: 'Make it friendlier',
    app: 'Slack',
    keys: ['⌘', '⇧', 'Space'],
    prompt: 'Make it friendlier',
    before: 'Need the numbers by EOD. Why is this late again?',
    after: "Hey! Could you send the numbers over by end of day? Let me know if anything's blocking you, happy to help."
  },
  {
    id: 'shorten',
    label: 'Shorten',
    app: 'Mail',
    keys: ['⌘', '⇧', 'Space'],
    prompt: 'Make it half as long',
    before:
      'I just wanted to quickly reach out and follow up on the proposal that I sent over last week, to see whether you have had a chance to take a look at it yet and whether you have any thoughts or questions.',
    after: 'Following up on last week’s proposal. Have you had a chance to look? Happy to answer any questions.'
  },
  {
    id: 'preset',
    label: 'Use a preset',
    app: 'Slack',
    keys: ['⌘', '⇧', 'Space'],
    preset: 'Slack reply',
    prompt: 'Rewrite it',
    before:
      'Hello, I have gone through the document you shared and I am completely fine with moving the launch to Friday. Please let me know if anything else is needed from my side. Thanks and regards.',
    after: 'Read the doc, Friday works for me! Shout if you need anything else.'
  },
  {
    id: 'translate',
    label: 'Translate',
    app: 'Messages',
    keys: ['⌘', '⇧', 'Space'],
    prompt: 'Translate to Spanish',
    before: 'Thanks for your patience. The fix ships tomorrow morning.',
    after: 'Gracias por tu paciencia. La corrección sale mañana por la mañana.'
  },
  {
    id: 'draft',
    label: 'Write from scratch',
    app: 'Calendar',
    keys: ['⌘', '⇧', 'Space'],
    prompt: 'Politely decline the meeting and suggest next Tuesday',
    before: null,
    after:
      "Thanks for the invite! I can't make it this week, but I'd love to join. Would next Tuesday work instead? Happy to fit around your schedule."
  }
]
