export const OPENAI_BASE_URL = 'https://api.openai.com/v1'

/** Model ids containing any of these are not chat text models. */
export const NON_CHAT_MODEL_MARKERS = [
  'audio',
  'realtime',
  'transcribe',
  'tts',
  'image',
  'search',
  'instruct',
  'embedding',
  'moderation',
  'codex',
  'computer-use'
]
