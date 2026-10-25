import { OUTPUT_RULES } from '@shared/constants'
import type { Preset } from '@shared/types'
import type { ChatMessage } from '../types'

interface BuildMessagesInput {
  systemPrompt: string
  preset?: Preset | null
  instruction: string
  text: string
}

/**
 * Turns a preset into an explicit style request for the user message, or an empty string if it adds nothing.
 * It sits next to the instruction (not in the system prompt) so it wins over "keep the tone" instructions such as Fix.
 */
function presetSection(preset: Preset): string {
  const parts = [
    preset.instructions.trim() && `<style>\n${preset.instructions.trim()}\n</style>`,
    preset.about.trim() && `<about_me>\n${preset.about.trim()}\n</about_me>`
  ].filter(Boolean)
  if (!parts.length) return ''
  return [
    `Write the result in my "${preset.name}" style. This style overrides any request to keep the original tone, length or format; still keep the meaning. Use the details about me where they fit (e.g. a greeting or sign-off).`,
    ...parts
  ].join('\n\n')
}

/**
 * Builds the system + user chat messages. The user message holds the instruction, then the preset's
 * style (if any), then the selected text (if any) in `<text>` tags. The output rules are appended to the system prompt.
 */
export function buildMessages({ systemPrompt, preset, instruction, text }: BuildMessagesInput): ChatMessage[] {
  const system = [systemPrompt.trim(), OUTPUT_RULES].filter(Boolean).join('\n\n')
  const user = [instruction.trim(), preset ? presetSection(preset) : '', text.trim() ? `<text>\n${text}\n</text>` : '']
    .filter(Boolean)
    .join('\n\n')

  return [
    { role: 'system', content: system },
    { role: 'user', content: user }
  ]
}
