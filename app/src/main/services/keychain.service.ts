import { spawnSync } from 'child_process'
import { KEYCHAIN_ACCOUNT, KEYCHAIN_SERVICE, SECURITY_TOOL_PATH } from '../constants'

/** `security` exit code when the item does not exist. */
const ITEM_NOT_FOUND = 44
const TIMEOUT_MS = 5000

/**
 * Stores the API key as a generic password in the login keychain via Apple's `security` tool.
 *
 * Why not Electron's safeStorage: macOS ties keychain access to the code signature of the app that reads the item.
 * PhaseType is ad-hoc signed, so its signature changes with every build and macOS asks for the login password
 * (twice: once for the item's access list, once for its partition list). Going through `security`, which is
 * Apple-signed and never changes, means the item always "belongs" to the same tool, so there are no prompts.
 * The key is still encrypted at rest in the keychain.
 */

/** Returns the saved key, or null if there is none or it cannot be read. */
function get(): string | null {
  const result = spawnSync(SECURITY_TOOL_PATH, ['find-generic-password', '-s', KEYCHAIN_SERVICE, '-a', KEYCHAIN_ACCOUNT, '-w'], {
    encoding: 'utf8',
    timeout: TIMEOUT_MS
  })
  if (result.status === 0) return result.stdout.replace(/\n$/, '') || null
  if (result.status !== ITEM_NOT_FOUND) console.error('[keychain] Could not read the API key.', result.error ?? result.stderr)
  return null
}

/**
 * Saves (or replaces) the key. The command goes through stdin in `security -i` mode so the key never appears in the
 * process list. Throws if the key has characters that cannot be quoted safely, or if saving fails.
 */
function set(value: string): void {
  if (!/^[\x21-\x7e]+$/.test(value) || /["\\]/.test(value)) {
    throw new Error('The API key contains characters that are not allowed.')
  }
  const command = `add-generic-password -U -s "${KEYCHAIN_SERVICE}" -a "${KEYCHAIN_ACCOUNT}" -w "${value}"\n`
  const result = spawnSync(SECURITY_TOOL_PATH, ['-i'], { input: command, encoding: 'utf8', timeout: TIMEOUT_MS })
  // `security -i` can exit 0 even when the command inside fails, so confirm by reading it back.
  if (result.status !== 0 || get() !== value) {
    console.error('[keychain] Could not save the API key.', result.error ?? result.stderr)
    throw new Error('Could not save the API key to the keychain.')
  }
}

export const keychainService = { get, set }
