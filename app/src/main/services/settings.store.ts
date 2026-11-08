import { app, safeStorage } from 'electron'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { DEFAULT_SETTINGS } from '@shared/constants'
import type { AppSettings, PublicSettings } from '@shared/types'
import { SETTINGS_FILE_NAME } from '../constants'
import { toApiKeyHint } from '../helpers'
import type { StoredSettings } from '../types'
import { keychainService } from './keychain.service'

const EMPTY_STORE: StoredSettings = { ...DEFAULT_SETTINGS }

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

/** In-memory copy of the key so each request doesn't spawn `security`. `undefined` = not loaded yet. */
let apiKeyCache: string | null | undefined

/**
 * Reads a key saved by older versions in settings.json (safeStorage-encrypted or plain), or null.
 * Decrypting it is the one time older installs may still see the keychain password prompt.
 */
function readLegacyApiKey(): string | null {
  const { apiKey, apiKeyEncrypted } = read()
  if (!apiKey) return null
  if (!apiKeyEncrypted) return apiKey
  try {
    return safeStorage.decryptString(Buffer.from(apiKey, 'base64'))
  } catch (error) {
    console.error('[settings] Could not decrypt the old API key.', error)
    return null
  }
}

/** Removes the old API key fields from settings.json. */
function clearLegacyApiKey(): void {
  const { apiKey, apiKeyEncrypted, ...rest } = read()
  if (apiKey !== undefined || apiKeyEncrypted !== undefined) write(rest)
}

/** Returns the saved API key from the keychain, moving over a key saved by older versions if needed. Null if none. */
function getApiKey(): string | null {
  if (apiKeyCache !== undefined) return apiKeyCache
  let apiKey = keychainService.get()
  if (!apiKey) {
    const legacy = readLegacyApiKey()
    if (legacy) {
      try {
        keychainService.set(legacy)
        clearLegacyApiKey()
      } catch (error) {
        console.error('[settings] Could not move the API key to the keychain.', error)
      }
      apiKey = legacy
    }
  }
  apiKeyCache = apiKey
  return apiKey
}

/** Saves the API key to the keychain. Throws if it cannot be saved. */
function setApiKey(apiKey: string): void {
  keychainService.set(apiKey)
  apiKeyCache = apiKey
  clearLegacyApiKey()
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

/** Reads and writes the app settings on disk and the API key in the keychain. */
export const settingsStore = { getSettings, getPublicSettings, updateSettings, getApiKey, setApiKey }
