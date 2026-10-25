import { execFile } from 'child_process'

/** Runs a command-line tool and resolves with its stdout. Rejects with stderr (or the error) if it fails or times out. */
export function runFile(file: string, args: string[], { timeoutMs }: { timeoutMs: number }): Promise<string> {
  return new Promise((resolve, reject) => {
    execFile(file, args, { timeout: timeoutMs, maxBuffer: 64 * 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) reject(new Error(stderr.trim() || error.message))
      else resolve(stdout)
    })
  })
}
