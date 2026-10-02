/** "sk-proj-abc…wxyz" style hint so users can tell which key is saved. */
export function toApiKeyHint(apiKey: string): string {
  if (apiKey.length <= 10) return '••••'
  return `${apiKey.slice(0, 7)}…${apiKey.slice(-4)}`
}
