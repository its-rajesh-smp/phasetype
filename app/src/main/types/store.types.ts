import type { AppSettings } from '@shared/types'

export interface StoredSettings extends AppSettings {
  /** Base64 of the safeStorage-encrypted key, or the plain key when encryption is unavailable. */
  apiKey: string | null
  apiKeyEncrypted: boolean
}
