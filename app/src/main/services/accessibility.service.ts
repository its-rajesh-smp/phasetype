import { execFile } from 'child_process'
import { app } from 'electron'
import { join } from 'path'
import { AX_HELPER_TIMEOUT_MS } from '../constants'
import type { CapturedSelection } from '../types'

/** The helper built from native/ax-helper: bundled in Resources when packaged, in native/bin during development. */
const HELPER_PATH = app.isPackaged
  ? join(process.resourcesPath, 'phasetype-ax')
  : join(app.getAppPath(), 'native/bin/phasetype-ax')

interface HelperOutput {
  ok: boolean
  text?: string
  appId?: string
  reason?: string
}

/** Runs the helper with `args` and optional stdin. Resolves with its output, or a failure if it can't run. */
function runHelper(args: string[], input?: string): Promise<HelperOutput> {
  return new Promise((resolve) => {
    const child = execFile(HELPER_PATH, args, { timeout: AX_HELPER_TIMEOUT_MS }, (error, stdout) => {
      if (error) {
        resolve({ ok: false, reason: error.message })
        return
      }
      try {
        resolve(JSON.parse(stdout) as HelperOutput)
      } catch {
        resolve({ ok: false, reason: `Unexpected output: ${stdout}` })
      }
    })
    child.stdin?.end(input ?? '')
  })
}

/** Reads the frontmost app's selected text directly. Returns null if the app doesn't expose it. */
async function readSelection(): Promise<CapturedSelection | null> {
  const output = await runHelper(['read'])
  if (!output.ok || !output.text) return null
  return { text: output.text, sourceAppId: output.appId ?? null }
}

/**
 * Replaces the selection in the app with `appId` directly. Returns false if it couldn't, without changing anything:
 * when the app isn't frontmost, in web content, or the app ignores the request.
 */
async function replaceSelection(text: string, appId: string): Promise<boolean> {
  const output = await runHelper(['replace', appId], text)
  return output.ok
}

/** Reads and replaces selected text in other apps through the macOS Accessibility API, skipping the clipboard. */
export const accessibilityService = { readSelection, replaceSelection }
