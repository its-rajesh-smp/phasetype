import type { TokenUsage } from '@shared/types'
import type { AudioClip } from './attachment.types'

/** One part of a multimodal user message, in the OpenAI chat completions format. */
export type ChatContentPart =
  | { type: 'text'; text: string }
  | { type: 'image_url'; image_url: { url: string } }
  | { type: 'file'; file: { filename: string; file_data: string } }

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string | ChatContentPart[]
}

export interface StreamCompletionOptions {
  apiKey: string
  model: string
  messages: ChatMessage[]
  signal: AbortSignal
  onDelta: (delta: string) => void
}

export interface TranscribeOptions {
  apiKey: string
  clip: AudioClip
  signal: AbortSignal
}

export interface Transcription {
  text: string
  /** The model that transcribed it, for the usage history. */
  model: string
  usage: TokenUsage | null
}

/** Every AI provider (OpenAI today; Anthropic, Gemini, local models later) implements this. */
export interface AiProvider {
  listModels(apiKey: string): Promise<string[]>
  /** Streams the answer through `onDelta`, then resolves with the tokens used, if the provider reported them. */
  streamCompletion(options: StreamCompletionOptions): Promise<TokenUsage | null>
  transcribe(options: TranscribeOptions): Promise<Transcription>
}
