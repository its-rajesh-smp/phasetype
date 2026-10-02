export type DemoStageId = 'draft' | 'select' | 'hotkey' | 'prompt' | 'thinking' | 'stream' | 'paste' | 'done'

export interface DemoStage {
  id: DemoStageId
  /** How long to hold the stage once any typing in it has finished. */
  holdMs: number
  /** Delay between typed characters (prompt) or streamed words (result). */
  stepMs?: number
}

export interface DemoScene {
  stage: DemoStageId
  draft: string
  prompt: string
  output: string
  isSelected: boolean
  isPanelOpen: boolean
  isStreaming: boolean
  isPasting: boolean
  justPasted: boolean
  showHotkey: boolean
}
