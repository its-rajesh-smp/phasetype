export interface ChatMessage {
  role: 'system' | 'user'
  content: string
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
