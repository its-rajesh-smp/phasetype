import type { AppSettings, HotkeySettingKey, Preset } from '../types'

export const DEFAULT_HOTKEY = 'Command+Shift+Space'
export const DEFAULT_QUICK_FIX_HOTKEY = 'Alt+Shift+Space'

export const DEFAULT_HOTKEYS: Record<HotkeySettingKey, string> = {
  hotkey: DEFAULT_HOTKEY,
  quickFixHotkey: DEFAULT_QUICK_FIX_HOTKEY
}

export const DEFAULT_SYSTEM_PROMPT = `You are PhaseType, a writing assistant that lives on the user's Mac. You help them write, rewrite, and fix text.
Match the language of the input text. Keep the author's voice and the original formatting (line breaks, lists) unless asked to change it.`

export const NEW_PRESET_NAME = 'Untitled preset'

/** Starter presets, so the Presets tab shows what a preset looks like. */
export const DEFAULT_PRESETS: Preset[] = [
  {
    id: 'slack-reply',
    name: 'Slack reply',
    instructions: 'Short and casual, like a quick chat message. One to three sentences, no greeting or sign-off.',
    about: '',
    enabled: true
  },
  {
    id: 'email-reply',
    name: 'Email reply',
    instructions: 'Clear, polite and professional. Open with a greeting, keep paragraphs short, and end with a sign-off.',
    about: '',
    enabled: true
  }
]

export const DEFAULT_SETTINGS: AppSettings = {
  provider: 'openai',
  model: '',
  hotkey: DEFAULT_HOTKEY,
  quickFixHotkey: DEFAULT_QUICK_FIX_HOTKEY,
  systemPrompt: DEFAULT_SYSTEM_PROMPT,
  presets: DEFAULT_PRESETS,
  launchAtLogin: false,
  onboarded: false
}
