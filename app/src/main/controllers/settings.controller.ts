import type { AppSettings, HotkeySettingKey, PublicSettings, Result, SettingsUpdate } from '@shared/types'
import { hotkeyService, loginItemService, settingsStore, trayService } from '../services'
import { handleHotkey } from './panel.controller'
import { handleQuickFixHotkey } from './quickFix.controller'

const HOTKEY_TAKEN_ERROR = 'That shortcut is already used by macOS or another app. Try a different one.'
const HOTKEY_DUPLICATE_ERROR = 'The panel and quick fix shortcuts must be different.'

const UPDATABLE_KEYS: (keyof SettingsUpdate)[] = ['provider', 'model', 'hotkey', 'quickFixHotkey', 'systemPrompt', 'launchAtLogin']

const HOTKEY_KEYS: HotkeySettingKey[] = ['hotkey', 'quickFixHotkey']

const HOTKEY_HANDLERS: Record<HotkeySettingKey, () => void> = {
  hotkey: handleHotkey,
  quickFixHotkey: handleQuickFixHotkey
}

const HOTKEY_LABELS: Record<HotkeySettingKey, string> = { hotkey: 'panel', quickFixHotkey: 'quick fix' }

/** Drops any keys from the patch that the renderer is not allowed to change. */
function pickAllowed(patch: SettingsUpdate): Partial<AppSettings> {
  return Object.fromEntries(
    Object.entries(patch).filter(([key]) => UPDATABLE_KEYS.includes(key as keyof SettingsUpdate))
  ) as Partial<AppSettings>
}

/** True if another hotkey setting already uses this accelerator. */
const isUsedByOtherHotkey = (key: HotkeySettingKey, accelerator: string, settings: AppSettings): boolean =>
  HOTKEY_KEYS.some((other) => other !== key && settings[other] === accelerator)

/**
 * Checks a changed hotkey and, once onboarded, registers it in place of the old one.
 * Returns an error message, or null if the hotkey is fine.
 */
function applyHotkey(key: HotkeySettingKey, accelerator: string, settings: AppSettings): string | null {
  if (isUsedByOtherHotkey(key, accelerator, settings)) return HOTKEY_DUPLICATE_ERROR
  const ok = settings.onboarded
    ? hotkeyService.register(key, accelerator, HOTKEY_HANDLERS[key])
    : hotkeyService.isAvailable(accelerator)
  return ok ? null : HOTKEY_TAKEN_ERROR
}

/** Registers every saved hotkey. Returns an error result naming the first one that could not be registered. */
export function registerHotkeys(): Result {
  const settings = settingsStore.getSettings()
  for (const key of HOTKEY_KEYS) {
    const accelerator = settings[key]
    const label = HOTKEY_LABELS[key]
    if (isUsedByOtherHotkey(key, accelerator, settings)) return { ok: false, error: HOTKEY_DUPLICATE_ERROR }
    if (!hotkeyService.register(key, accelerator, HOTKEY_HANDLERS[key])) {
      return { ok: false, error: `The ${label} shortcut is already used by macOS or another app. Try a different one.` }
    }
  }
  return { ok: true, data: undefined }
}

/**
 * Validates and saves a settings change, re-registering hotkeys and the login item as needed.
 * Returns an error result if a shortcut is taken or the API key is empty; otherwise the new public settings.
 */
export function updateSettings(patch: SettingsUpdate): Result<PublicSettings> {
  const changes = pickAllowed(patch)
  const next = { ...settingsStore.getSettings(), ...changes }

  for (const key of HOTKEY_KEYS) {
    const accelerator = changes[key]
    if (accelerator === undefined) continue
    const error = applyHotkey(key, accelerator, next)
    if (error) return { ok: false, error }
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

/** Finishes setup once an API key and model exist: registers the hotkeys and marks the user onboarded. */
export function completeOnboarding(): Result<PublicSettings> {
  const settings = settingsStore.getPublicSettings()
  if (!settings.hasApiKey || !settings.model) return { ok: false, error: 'Connect your OpenAI account first.' }
  const registered = registerHotkeys()
  if (!registered.ok) return registered

  settingsStore.updateSettings({ onboarded: true })
  trayService.refresh()
  return { ok: true, data: settingsStore.getPublicSettings() }
}
