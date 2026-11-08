import { TRY_LIMITS } from '../constants/limits.constants'
import { TRY_PRESETS } from '../constants/prompt.constants'
import type { TryHistoryTurn, TryRequest } from '../types/try.types'

type Validation = { ok: true; data: TryRequest } | { ok: false; error: string }

const isString = (value: unknown): value is string => typeof value === 'string'

/** Keeps the newest well-formed turns, within the size caps. */
function sanitizeHistory(value: unknown): TryHistoryTurn[] | null {
  if (value === undefined) return []
  if (!Array.isArray(value)) return null
  const turns = value.filter(
    (turn): turn is TryHistoryTurn => isString(turn?.instruction) && isString(turn?.output)
  )
  if (turns.length !== value.length) return null
  const tooLong = turns.some(
    (turn) => turn.instruction.length > TRY_LIMITS.maxInstructionChars || turn.output.length > TRY_LIMITS.maxHistoryOutputChars
  )
  return tooLong ? null : turns.slice(-TRY_LIMITS.maxHistoryTurns)
}

/** Checks a request body from the playground and returns it typed, or a message saying what is wrong. */
export function validateTryRequest(body: unknown): Validation {
  const { instruction, text, presetId, history } = (body ?? {}) as Record<string, unknown>
  if (!isString(instruction) || !instruction.trim()) return { ok: false, error: 'Tell PhaseType what to do first.' }
  if (instruction.length > TRY_LIMITS.maxInstructionChars) {
    return { ok: false, error: `Keep the prompt under ${TRY_LIMITS.maxInstructionChars} characters.` }
  }
  if (text !== undefined && !isString(text)) return { ok: false, error: 'The selected text is not valid.' }
  if ((text ?? '').length > TRY_LIMITS.maxTextChars) {
    return { ok: false, error: `Select under ${TRY_LIMITS.maxTextChars.toLocaleString()} characters to try it here.` }
  }
  const knownPreset = presetId === null || presetId === undefined || TRY_PRESETS.some((preset) => preset.id === presetId)
  if (!knownPreset) return { ok: false, error: 'That preset does not exist.' }
  const turns = sanitizeHistory(history)
  if (!turns) return { ok: false, error: 'The conversation is too long. Start over to keep going.' }

  return { ok: true, data: { instruction, text: text ?? '', presetId: (presetId as string | null) ?? null, history: turns } }
}
