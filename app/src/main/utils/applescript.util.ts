import { execFile } from 'child_process'

/**
 * Runs an AppleScript via `osascript` and resolves with its trimmed output.
 * Rejects with the stderr message if the script fails.
 */
export function runAppleScript(script: string): Promise<string> {
  return new Promise((resolve, reject) => {
    execFile('osascript', ['-e', script], (error, stdout, stderr) => {
      if (error) reject(new Error(stderr.trim() || error.message))
      else resolve(stdout.trim())
    })
  })
}
