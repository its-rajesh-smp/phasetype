import type { AppSettings } from '@shared/types'

export interface StoredSettings extends AppSettings {
  /**
   * Legacy: older versions kept the key here (base64 safeStorage ciphertext, or plain text when encryption was
   * unavailable). It now lives in the keychain; these are only read once to move an existing key over.
   */
  apiKey?: string | null
  apiKeyEncrypted?: boolean
}
