import { FOLLOW_UP_RULES, OUTPUT_RULES, TRY_PRESETS, TRY_SYSTEM_PROMPT } from '../constants/prompt.constants'
import type { TryPreset, TryRequest } from '../types/try.types'

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

/** The preset as an explicit style request, placed next to the instruction so it wins over "keep the tone". */
const presetSection = (preset: TryPreset): string =>
  [
    `Write the result in my "${preset.name}" style. This style overrides any request to keep the original tone, length or format; still keep the meaning.`,
    `<style>\n${preset.instructions}\n</style>`
  ].join('\n\n')

const userMessage = (instruction: string, text: string, preset?: TryPreset): ChatMessage => ({
  role: 'user',
  content: [instruction.trim(), preset ? presetSection(preset) : '', text.trim() ? `<text>\n${text}\n</text>` : '']
    .filter(Boolean)
    .join('\n\n')
})

/**
 * Builds the chat messages the same way the app does: the selected text rides with the first prompt, earlier answers
 * follow in order, and the newest prompt comes last with the preset's style.
 */
export function buildTryMessages({ instruction, text, presetId, history }: TryRequest): ChatMessage[] {
  const preset = TRY_PRESETS.find((item) => item.id === presetId)
  const system = [TRY_SYSTEM_PROMPT, history.length ? FOLLOW_UP_RULES : '', OUTPUT_RULES].filter(Boolean).join('\n\n')
  const instructions = [...history.map((turn) => turn.instruction), instruction]

  const conversation = instructions.flatMap((turnInstruction, index): ChatMessage[] => {
    const isLatest = index === instructions.length - 1
    const user = userMessage(turnInstruction, index === 0 ? text : '', isLatest ? preset : undefined)
    return isLatest ? [user] : [user, { role: 'assistant', content: history[index].output }]
  })

  return [{ role: 'system', content: system }, ...conversation]
}
