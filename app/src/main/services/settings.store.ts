import { app, safeStorage } from 'electron'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { DEFAULT_SETTINGS } from '@shared/constants'
import type { AppSettings, PublicSettings } from '@shared/types'
import { SETTINGS_FILE_NAME } from '../constants'
import { toApiKeyHint } from '../helpers'
import type { StoredSettings } from '../types'

const EMPTY_STORE: StoredSettings = { ...DEFAULT_SETTINGS, apiKey: null, apiKeyEncrypted: false }

let cache: StoredSettings | null = null

/** Path to the settings JSON file in the app's user data folder. */
const filePath = (): string => join(app.getPath('userData'), SETTINGS_FILE_NAME)

/**
 * Returns the stored settings (cached after the first read), merged over defaults.
 * Falls back to defaults if the file is missing or unreadable.
 */
function read(): StoredSettings {
  if (cache) return cache
  try {
    const path = filePath()
    cache = existsSync(path)
      ? { ...EMPTY_STORE, ...(JSON.parse(readFileSync(path, 'utf8')) as Partial<StoredSettings>) }
      : { ...EMPTY_STORE }
  } catch (error) {
    console.error('[settings] Could not read settings, using defaults.', error)
    cache = { ...EMPTY_STORE }
  }
  return cache
}

/** Saves settings to disk (owner-only file permissions) and updates the cache. */
function write(next: StoredSettings): void {
  const path = filePath()
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, JSON.stringify(next, null, 2), { encoding: 'utf8', mode: 0o600 })
  cache = next
}

/** Returns the saved API key, decrypting it if needed. Returns null if none is saved or decryption fails. */
function getApiKey(): string | null {
  const { apiKey, apiKeyEncrypted } = read()
  if (!apiKey) return null
  if (!apiKeyEncrypted) return apiKey
  try {
    return safeStorage.decryptString(Buffer.from(apiKey, 'base64'))
  } catch (error) {
    console.error('[settings] Could not decrypt the API key.', error)
    return null
  }
}

/** Saves the API key, encrypted with the OS keychain when available, plain text otherwise. */
function setApiKey(apiKey: string): void {
  const canEncrypt = safeStorage.isEncryptionAvailable()
  write({
    ...read(),
    apiKey: canEncrypt ? safeStorage.encryptString(apiKey).toString('base64') : apiKey,
    apiKeyEncrypted: canEncrypt
  })
}

/** Returns the app settings without the API key fields. */
function getSettings(): AppSettings {
  const { apiKey: _apiKey, apiKeyEncrypted: _encrypted, ...settings } = read()
  return settings
}

/** Returns settings safe to send to the renderer: no API key, just whether one exists and a masked hint. */
function getPublicSettings(): PublicSettings {
  const apiKey = getApiKey()
  return { ...getSettings(), hasApiKey: Boolean(apiKey), apiKeyHint: apiKey ? toApiKeyHint(apiKey) : null }
}

/** Merges a partial change into the stored settings and saves it. */
function updateSettings(patch: Partial<AppSettings>): void {
  write({ ...read(), ...patch })
}

/** Reads and writes the app settings and the (encrypted) API key on disk. */
export const settingsStore = { getSettings, getPublicSettings, updateSettings, getApiKey, setApiKey }
