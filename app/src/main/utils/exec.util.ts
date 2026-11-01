import { execFile } from 'child_process'
import { app } from 'electron'
import { join } from 'path'

/**
 * Runs a command-line tool and resolves with its stdout. Rejects with stderr (or the error) if it fails or times out,
 * and with an AbortError if `signal` aborts (the tool is killed).
 */
export function runFile(file: string, args: string[], { timeoutMs, signal }: { timeoutMs: number; signal?: AbortSignal }): Promise<string> {
  return new Promise((resolve, reject) => {
    execFile(file, args, { timeout: timeoutMs, maxBuffer: 64 * 1024 * 1024, signal }, (error, stdout, stderr) => {
      if (error?.name === 'AbortError') reject(error)
      else if (error) reject(new Error(stderr.trim() || error.message))
      else resolve(stdout)
    })
  })
}

/** Path to a helper built from native/: bundled in Resources when packaged, in native/bin during development. */
export const nativeHelperPath = (name: string): string =>
  app.isPackaged ? join(process.resourcesPath, name) : join(app.getAppPath(), 'native/bin', name)
