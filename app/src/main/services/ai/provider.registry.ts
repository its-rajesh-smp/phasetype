import type { AiProviderId } from '@shared/types'
import type { AiProvider } from '../../types'
import { openAiProvider } from './providers/openai.provider'

const providers: Record<AiProviderId, AiProvider> = {
  openai: openAiProvider
}

/** Returns the AI provider implementation for the given provider id. */
export const getProvider = (id: AiProviderId): AiProvider => providers[id]
