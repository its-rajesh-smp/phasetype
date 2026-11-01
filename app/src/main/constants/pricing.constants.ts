/** A model's list price in US dollars per million tokens. */
export interface ModelPrice {
  input: number
  /** Price of input tokens served from the prompt cache. Defaults to the input price. */
  cachedInput?: number
  output: number
}

/**
 * OpenAI list prices used to estimate what each request cost. Prices change and new models appear, so requests to a
 * model missing here are shown without a cost rather than a wrong one. Dated snapshots ("gpt-4.1-mini-2025-04-14")
 * use the price of their base model.
 */
export const MODEL_PRICES: Record<string, ModelPrice> = {
  'gpt-5': { input: 1.25, cachedInput: 0.125, output: 10 },
  'gpt-5-mini': { input: 0.25, cachedInput: 0.025, output: 2 },
  'gpt-5-nano': { input: 0.05, cachedInput: 0.005, output: 0.4 },
  'gpt-5-chat-latest': { input: 1.25, cachedInput: 0.125, output: 10 },
  'gpt-4.1': { input: 2, cachedInput: 0.5, output: 8 },
  'gpt-4.1-mini': { input: 0.4, cachedInput: 0.1, output: 1.6 },
  'gpt-4.1-nano': { input: 0.1, cachedInput: 0.025, output: 0.4 },
  'gpt-4o': { input: 2.5, cachedInput: 1.25, output: 10 },
  'gpt-4o-mini': { input: 0.15, cachedInput: 0.075, output: 0.6 },
  'chatgpt-4o-latest': { input: 5, output: 15 },
  'gpt-4-turbo': { input: 10, output: 30 },
  'gpt-4': { input: 30, output: 60 },
  'gpt-3.5-turbo': { input: 0.5, output: 1.5 },
  o1: { input: 15, cachedInput: 7.5, output: 60 },
  'o1-mini': { input: 1.1, cachedInput: 0.55, output: 4.4 },
  o3: { input: 2, cachedInput: 0.5, output: 8 },
  'o3-mini': { input: 1.1, cachedInput: 0.55, output: 4.4 },
  'o4-mini': { input: 1.1, cachedInput: 0.275, output: 4.4 },
  // Transcription: input is almost all audio tokens, so they are priced at the audio rate.
  'gpt-4o-mini-transcribe': { input: 3, output: 5 },
  'gpt-4o-transcribe': { input: 6, output: 10 }
}
