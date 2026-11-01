import { app } from 'electron'
import { appendFile, readFile, rm, writeFile } from 'fs/promises'
import { join } from 'path'
import type { UsageRecord } from '@shared/types'
import { MAX_USAGE_RECORDS, USAGE_FILE_NAME } from '../constants'

/** Path to the history file in the app's user data folder. It never leaves this Mac. */
const filePath = (): string => join(app.getPath('userData'), USAGE_FILE_NAME)

/** Writes are queued so an append and a trim never interleave. */
let pending: Promise<unknown> = Promise.resolve()
const enqueue = <T>(task: () => Promise<T>): Promise<T> => {
  const next = pending.then(task)
  pending = next.catch(() => undefined)
  return next
}

/** Parses the history file, skipping lines that can't be read (e.g. cut off by a crash). Oldest first. */
async function readAll(): Promise<UsageRecord[]> {
  let content: string
  try {
    content = await readFile(filePath(), 'utf8')
  } catch {
    return []
  }
  return content.split('\n').flatMap((line) => {
    if (!line.trim()) return []
    try {
      return [JSON.parse(line) as UsageRecord]
    } catch {
      return []
    }
  })
}

/** Adds a record to the end of the history (owner-only file permissions). Logs, rather than throws, if it can't. */
function record(entry: UsageRecord): void {
  void enqueue(() => appendFile(filePath(), `${JSON.stringify(entry)}\n`, { encoding: 'utf8', mode: 0o600 })).catch((error) =>
    console.error('[usage] Could not save the request to the history.', error)
  )
}

/** Returns the history, newest first. Drops the oldest records from the file once there are too many. */
function list(): Promise<UsageRecord[]> {
  return enqueue(async () => {
    const records = await readAll()
    if (records.length <= MAX_USAGE_RECORDS) return records.reverse()
    const kept = records.slice(-MAX_USAGE_RECORDS)
    await writeFile(filePath(), kept.map((entry) => `${JSON.stringify(entry)}\n`).join(''), { encoding: 'utf8', mode: 0o600 })
    return kept.reverse()
  })
}

/** Deletes the whole history. */
function clear(): Promise<void> {
  return enqueue(() => rm(filePath(), { force: true }))
}

/** Keeps the history of AI requests (what was asked, the answer, tokens and cost) in a local file. */
export const usageStore = { record, list, clear }
