export type AiProviderId = 'openai'

/** An earlier prompt in the panel conversation and the answer it got. */
export interface ChatTurn {
  instruction: string
  output: string
}

export interface AiRunRequest {
  requestId: string
  instruction: string
  /** Earlier prompts and answers in this panel session, oldest first, so follow-ups have context. */
  history?: ChatTurn[]
  /** Text the instruction applies to. Empty when the user is writing from scratch. */
  text: string
  /** Preset whose style and details are added to the system prompt. */
  presetId?: string | null
  /** Files from the panel context to send along with the instruction. */
  attachmentIds?: string[]
}

export type AiStreamEvent =
  | { requestId: string; type: 'delta'; delta: string }
  | { requestId: string; type: 'done' }
  | { requestId: string; type: 'error'; message: string }

export interface QuickAction {
  id: string
  label: string
  instruction: string
  /** Quick actions that rewrite existing text are disabled when nothing is selected. */
  requiresText: boolean
}
