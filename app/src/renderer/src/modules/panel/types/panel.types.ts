export type TurnStatus = 'streaming' | 'done' | 'error'

/** What one prompt sends, apart from the conversation history. */
export interface RunInput {
  instruction: string
  /** What the conversation shows for the prompt, e.g. a quick action's short label instead of its full instruction. */
  label: string
  /** The original selected text. Always sent; follow-ups see earlier answers through the history. */
  text: string
  presetId: string | null
  attachmentIds: string[]
}

/** One prompt in the panel conversation and its (possibly still streaming) answer. */
export interface ConversationTurn extends RunInput {
  id: string
  requestId: string
  output: string
  status: TurnStatus
  error: string | null
  /** What's happening before the answer starts, e.g. "Transcribing call.mp4…". */
  progress: string | null
}
