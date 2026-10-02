export type AiProviderId = 'openai'

export interface AiRunRequest {
  requestId: string
  instruction: string
  /** Text the instruction applies to. Empty when the user is writing from scratch. */
  text: string
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
