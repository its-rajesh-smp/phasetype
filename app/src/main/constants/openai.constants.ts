export const OPENAI_BASE_URL = 'https://api.openai.com/v1'

/** Turns audio into text. The cheaper of OpenAI's transcription models; plenty for speech. */
export const OPENAI_TRANSCRIBE_MODEL = 'gpt-4o-mini-transcribe'

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
