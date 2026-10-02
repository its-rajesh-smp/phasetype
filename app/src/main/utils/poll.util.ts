import { sleep } from './sleep.util'

/** Calls `check` until it resolves to a non-null value or the timeout passes. */
export async function pollUntil<T>(
  check: () => Promise<T | null>,
  { timeoutMs, intervalMs }: { timeoutMs: number; intervalMs: number }
): Promise<T | null> {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    const value = await check()
    if (value !== null) return value
    await sleep(intervalMs)
  }
  return check()
}
