import { execFile } from 'child_process'

/**
 * Runs a JavaScript for Automation (JXA) script via `osascript`, passing `args` to its `run(argv)` handler.
 * Resolves with the trimmed output; rejects with the stderr message if the script fails.
 */
export function runJxa(script: string, args: string[] = []): Promise<string> {
  return new Promise((resolve, reject) => {
    execFile('osascript', ['-l', 'JavaScript', '-e', script, ...args], (error, stdout, stderr) => {
      if (error) reject(new Error(stderr.trim() || error.message))
      else resolve(stdout.trim())
    })
  })
}
