import { FOLLOW_UP_RULES, OUTPUT_RULES } from '@shared/constants'
import type { ChatTurn, Preset } from '@shared/types'
import type { ChatContentPart, ChatMessage, LoadedAttachment } from '../types'

interface BuildMessagesInput {
  systemPrompt: string
  preset?: Preset | null
  instruction: string
  text: string
  attachments?: LoadedAttachment[]
  /** Earlier prompts and answers, oldest first. */
  history?: ChatTurn[]
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

/** Turns a file into message parts: text files inline in `<file>` tags, images and PDFs as their own parts. */
function attachmentParts(attachment: LoadedAttachment): ChatContentPart[] {
  switch (attachment.kind) {
    case 'text':
      return [{ type: 'text', text: `<file name="${attachment.name}">\n${attachment.text}\n</file>` }]
    case 'image':
      return [
        { type: 'text', text: `Attached image: ${attachment.name}` },
        { type: 'image_url', image_url: { url: attachment.dataUrl } }
      ]
    case 'pdf':
      return [{ type: 'file', file: { filename: attachment.name, file_data: attachment.dataUrl } }]
  }
}

interface UserMessageInput {
  instruction: string
  preset?: Preset | null
  text?: string
  attachments?: LoadedAttachment[]
}

/** One user message: the instruction, then the preset's style, the selected text and the files, whichever apply. */
function userMessage({ instruction, preset, text = '', attachments = [] }: UserMessageInput): ChatMessage {
  const prompt = [instruction.trim(), preset ? presetSection(preset) : '', text.trim() ? `<text>\n${text}\n</text>` : '']
    .filter(Boolean)
    .join('\n\n')
  const content: ChatMessage['content'] = attachments.length
    ? [{ type: 'text', text: prompt }, ...attachments.flatMap(attachmentParts)]
    : prompt
  return { role: 'user', content }
}

/**
 * Builds the chat messages for a conversation. The first user message carries the selected text (in `<text>` tags) and
 * any files; earlier prompts and answers follow in order; the newest prompt comes last with the preset's style.
 * The output rules, and the follow-up rules once there is history, are appended to the system prompt.
 */
export function buildMessages({ systemPrompt, preset, instruction, text, attachments = [], history = [] }: BuildMessagesInput): ChatMessage[] {
  const system = [systemPrompt.trim(), history.length ? FOLLOW_UP_RULES : '', OUTPUT_RULES].filter(Boolean).join('\n\n')
  const instructions = [...history.map((turn) => turn.instruction), instruction]

  const conversation = instructions.flatMap((turnInstruction, index): ChatMessage[] => {
    const isFirst = index === 0
    const isLatest = index === instructions.length - 1
    const user = userMessage({
      instruction: turnInstruction,
      preset: isLatest ? preset : null,
      text: isFirst ? text : '',
      attachments: isFirst ? attachments : []
    })
    return isLatest ? [user] : [user, { role: 'assistant', content: history[index].output }]
  })

  return [{ role: 'system', content: system }, ...conversation]
}
