/** A saved writing style the visitor can apply on top of a prompt, mirroring the app's presets. */
export interface TryPreset {
  id: string
  name: string
  instructions: string
}

/** One earlier prompt and its answer, sent back so a follow-up can refine the last reply. */
export interface TryHistoryTurn {
  instruction: string
  output: string
}

/** The body the playground posts to the try API. */
export interface TryRequest {
  instruction: string
  text: string
  presetId: string | null
  history: TryHistoryTurn[]
}

export type TurnStatus = 'streaming' | 'done' | 'error'

/** A prompt shown in the panel and the answer streamed back for it. */
export interface PlaygroundTurn {
  instruction: string
  /** What the panel shows for the prompt, e.g. "Fix the sentence" instead of the full instruction. */
  label: string
  output: string
  status: TurnStatus
}

/** A character range in the editor. Equal ends mean a caret with nothing selected. */
export interface TextRange {
  start: number
  end: number
}

/** What the panel captured from the editor when it opened. */
export interface PanelCapture {
  text: string
  range: TextRange
}

export interface SampleText {
  id: string
  label: string
  /** Shown in the mock window's title bar. */
  app: string
  text: string
}

export type TryErrorKind = 'limit' | 'invalid' | 'unavailable'

/** The JSON body the try API returns when it refuses or fails a request before streaming. */
export interface TryErrorBody {
  error: string
  kind: TryErrorKind
}

/** A one-click prompt shown as a chip in the panel. */
export interface Suggestion {
  label: string
  instruction: string
}
