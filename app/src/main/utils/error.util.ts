/** Turns any thrown value into a readable message string. */
export const toErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : String(error)

/** True if the error came from an aborted request (AbortController). */
export const isAbortError = (error: unknown): boolean =>
  error instanceof Error && error.name === 'AbortError'
