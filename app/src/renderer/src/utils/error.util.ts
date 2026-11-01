/** Turns a thrown value into a readable message, or `fallback` if it has none. */
export const toErrorMessage = (error: unknown, fallback: string): string =>
  error instanceof Error && error.message ? error.message : fallback
