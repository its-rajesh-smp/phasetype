import { PREFERRED_OPENAI_MODELS } from '../constants'

/** Keeps the current model if the account still has it, otherwise picks a sensible default. */
export function pickDefaultModel(models: string[], current?: string): string {
  if (current && models.includes(current)) return current
  return PREFERRED_OPENAI_MODELS.find((model) => models.includes(model)) ?? models[0] ?? ''
}
