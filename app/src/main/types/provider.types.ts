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

/** Every AI provider (OpenAI today; Anthropic, Gemini, local models later) implements this. */
export interface AiProvider {
  listModels(apiKey: string): Promise<string[]>
  streamCompletion(options: StreamCompletionOptions): Promise<void>
}
