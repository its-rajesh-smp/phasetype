import type { TryPreset } from '../types/try.types'

// Kept in step with the app's prompts (app/src/shared/constants) so the web playground answers the way the app does.

export const TRY_SYSTEM_PROMPT = `You are PhaseType, a writing assistant. You help the user write, rewrite, and fix text.
Match the language of the input text. Keep the author's voice and the original formatting (line breaks, lists) unless asked to change it.
You only help with writing. If asked for anything else (code, facts, advice, chat), politely say this demo only rewrites and writes text.`

/** Appended to the system prompt so the output can be pasted as-is. */
export const OUTPUT_RULES =
  'Reply with only the resulting text. No preamble, no explanations, no surrounding quotes, and no markdown code fences unless the text itself needs them.'

/** Added to the system prompt once the conversation has earlier turns. */
export const FOLLOW_UP_RULES =
  'This is a conversation. A follow-up instruction applies to your most recent reply unless the user says otherwise; the original text is in the first message.'

export const QUICK_FIX = {
  label: 'Fix the sentence',
  instruction:
    'Fix the spelling, grammar, and punctuation of the text. Keep the meaning, tone, and formatting. Change as little as possible.'
} as const

/** The app's starter presets. The server looks these up by id, so visitors can't send their own style text. */
export const TRY_PRESETS: TryPreset[] = [
  {
    id: 'slack-reply',
    name: 'Slack reply',
    instructions: 'Short and casual, like a quick chat message. One to three sentences, no greeting or sign-off.'
  },
  {
    id: 'email-reply',
    name: 'Email reply',
    instructions: 'Clear, polite and professional. Open with a greeting, keep paragraphs short, and end with a sign-off.'
  }
]
