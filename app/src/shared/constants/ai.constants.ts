import type { QuickAction } from '../types'

/** Appended to every system prompt so the output can be pasted as-is. */
export const OUTPUT_RULES =
  'Reply with only the resulting text. No preamble, no explanations, no surrounding quotes, and no markdown code fences unless the text itself needs them.'

export const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'fix',
    label: 'Fix the sentence',
    instruction:
      'Fix the spelling, grammar, and punctuation of the text. Keep the meaning, tone, and formatting. Change as little as possible.',
    requiresText: true
  }
]

/** Tried in order when choosing a default model from the account's model list. */
export const PREFERRED_OPENAI_MODELS = ['gpt-4.1-mini', 'gpt-4o-mini', 'gpt-5-mini', 'gpt-4.1', 'gpt-4o']
