import type { AppSettings, HotkeySettingKey } from '../types'

export const DEFAULT_HOTKEY = 'Command+Shift+Space'
export const DEFAULT_QUICK_FIX_HOTKEY = 'Alt+Shift+Space'

export const DEFAULT_HOTKEYS: Record<HotkeySettingKey, string> = {
  hotkey: DEFAULT_HOTKEY,
  quickFixHotkey: DEFAULT_QUICK_FIX_HOTKEY
}

export const DEFAULT_SYSTEM_PROMPT = `You are PhaseType, a writing assistant that lives on the user's Mac. You help them write, rewrite, and fix text.
Match the language of the input text. Keep the author's voice and the original formatting (line breaks, lists) unless asked to change it.`

export const DEFAULT_SETTINGS: AppSettings = {
  provider: 'openai',
  model: '',
  hotkey: DEFAULT_HOTKEY,
  quickFixHotkey: DEFAULT_QUICK_FIX_HOTKEY,
  systemPrompt: DEFAULT_SYSTEM_PROMPT,
  launchAtLogin: false,
  onboarded: false
}
