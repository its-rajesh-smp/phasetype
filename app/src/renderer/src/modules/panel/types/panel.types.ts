export type StreamStatus = 'idle' | 'streaming' | 'done' | 'error'

export interface RunInput {
  instruction: string
  text: string
}
