import type { AppSettings, PublicSettings, Result, SettingsUpdate } from '@shared/types'
import { hotkeyService, loginItemService, settingsStore, trayService } from '../services'
import { handleHotkey } from './panel.controller'

const HOTKEY_TAKEN_ERROR = 'That shortcut is already used by macOS or another app. Try a different one.'

const UPDATABLE_KEYS: (keyof SettingsUpdate)[] = ['provider', 'model', 'hotkey', 'systemPrompt', 'launchAtLogin']

/** Drops any keys from the patch that the renderer is not allowed to change. */
function pickAllowed(patch: SettingsUpdate): Partial<AppSettings> {
  return Object.fromEntries(
    Object.entries(patch).filter(([key]) => UPDATABLE_KEYS.includes(key as keyof SettingsUpdate))
  ) as Partial<AppSettings>
}

/**
 * Validates and saves a settings change, re-registering the hotkey and login item as needed.
 * Returns an error result if the shortcut is taken or the API key is empty; otherwise the new public settings.
 */
export function updateSettings(patch: SettingsUpdate): Result<PublicSettings> {
  const changes = pickAllowed(patch)

  if (changes.hotkey !== undefined) {
    const { onboarded } = settingsStore.getSettings()
    const ok = onboarded
      ? hotkeyService.register(changes.hotkey, handleHotkey)
      : hotkeyService.isAvailable(changes.hotkey)
    if (!ok) return { ok: false, error: HOTKEY_TAKEN_ERROR }
  }

  if (patch.apiKey !== undefined) {
    const apiKey = patch.apiKey.trim()
    if (!apiKey) return { ok: false, error: 'The API key cannot be empty.' }
    settingsStore.setApiKey(apiKey)
  }

  if (changes.launchAtLogin !== undefined) loginItemService.set(changes.launchAtLogin)

  settingsStore.updateSettings(changes)
  trayService.refresh()
  return { ok: true, data: settingsStore.getPublicSettings() }
}

/** Finishes setup once an API key and model exist: registers the hotkey and marks the user onboarded. */
export function completeOnboarding(): Result<PublicSettings> {
  const settings = settingsStore.getPublicSettings()
  if (!settings.hasApiKey || !settings.model) return { ok: false, error: 'Connect your OpenAI account first.' }
  if (!hotkeyService.register(settings.hotkey, handleHotkey)) return { ok: false, error: HOTKEY_TAKEN_ERROR }

  settingsStore.updateSettings({ onboarded: true })
  trayService.refresh()
  return { ok: true, data: settingsStore.getPublicSettings() }
}
