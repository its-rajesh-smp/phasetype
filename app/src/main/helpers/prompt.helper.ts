import { OUTPUT_RULES } from '@shared/constants'
import type { ChatMessage } from '../types'

interface BuildMessagesInput {
  systemPrompt: string
  instruction: string
  text: string
}

/**
 * Builds the system + user chat messages. The selected text, if any, is wrapped in `<text>` tags
 * after the instruction, and the output rules are appended to the system prompt.
 */
export function buildMessages({ systemPrompt, instruction, text }: BuildMessagesInput): ChatMessage[] {
  const system = [systemPrompt.trim(), OUTPUT_RULES].filter(Boolean).join('\n\n')
  const user = text.trim()
    ? `${instruction.trim()}\n\n<text>\n${text}\n</text>`
    : instruction.trim()

  return [
    { role: 'system', content: system },
    { role: 'user', content: user }
  ]
}
