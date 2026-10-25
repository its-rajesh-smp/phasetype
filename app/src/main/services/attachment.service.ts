import { nativeImage } from 'electron'
import { randomUUID } from 'crypto'
import { open, readFile, rm, stat } from 'fs/promises'
import { tmpdir } from 'os'
import { basename, extname, join } from 'path'
import type { AttachmentKind, AttachmentSummary } from '@shared/types'
import {
  BINARY_SNIFF_BYTES,
  CONVERT_TIMEOUT_MS,
  CONVERTIBLE_IMAGE_EXTENSIONS,
  DOCUMENT_EXTENSIONS,
  IMAGE_EXTENSIONS,
  IMAGE_MIME_TYPES,
  MAX_ATTACHMENTS,
  MAX_IMAGE_BYTES,
  MAX_PDF_BYTES,
  MAX_TEXT_CHARS,
  MAX_TEXT_FILE_BYTES,
  TEXT_EXTENSIONS,
  THUMBNAIL_SIZE
} from '../constants'
import type { LoadedAttachment, StoredAttachment } from '../types'
import { runFile } from '../utils'

/** The files captured for the current panel session, by id. Replaced on every capture. */
let current = new Map<string, StoredAttachment>()

const toMegabytes = (bytes: number): number => Math.round(bytes / 1024 / 1024)

/** True if the start of the file has no NUL bytes, i.e. it is probably text. */
async function looksLikeText(path: string): Promise<boolean> {
  const handle = await open(path, 'r')
  try {
    const { buffer, bytesRead } = await handle.read(Buffer.alloc(BINARY_SNIFF_BYTES), 0, BINARY_SNIFF_BYTES, 0)
    return !buffer.subarray(0, bytesRead).includes(0)
  } finally {
    await handle.close()
  }
}

/** Decides how a file is sent, from its extension (and, for unknown ones, whether it looks like text). */
async function detectKind(path: string, extension: string): Promise<AttachmentKind | null> {
  if (IMAGE_EXTENSIONS.includes(extension) || CONVERTIBLE_IMAGE_EXTENSIONS.includes(extension)) return 'image'
  if (extension === 'pdf') return 'pdf'
  if (DOCUMENT_EXTENSIONS.includes(extension)) return 'document'
  if (TEXT_EXTENSIONS.includes(extension) || (await looksLikeText(path))) return 'text'
  return null
}

/** Returns why a file of this kind and size can't be sent, or null if it can. */
function sizeError(kind: AttachmentKind, sizeBytes: number): string | null {
  if (kind === 'image' && sizeBytes > MAX_IMAGE_BYTES) return `Images can be up to ${toMegabytes(MAX_IMAGE_BYTES)} MB.`
  if (kind === 'pdf' && sizeBytes > MAX_PDF_BYTES) return `PDFs can be up to ${toMegabytes(MAX_PDF_BYTES)} MB.`
  if (kind === 'text' && sizeBytes > MAX_TEXT_FILE_BYTES) return `Text files can be up to ${toMegabytes(MAX_TEXT_FILE_BYTES)} MB.`
  return null
}

/** Makes a Quick Look thumbnail as a data URL, or null if macOS can't make one. */
async function createThumbnail(path: string): Promise<string | null> {
  try {
    const image = await nativeImage.createThumbnailFromPath(path, THUMBNAIL_SIZE)
    return image.isEmpty() ? null : image.toDataURL()
  } catch {
    return null
  }
}

/** Looks at one file and describes it for the panel, including why it can't be sent, if so. */
async function describe(path: string): Promise<StoredAttachment> {
  const name = basename(path)
  const extension = extname(path).slice(1).toLowerCase()
  const base = { id: randomUUID(), name, extension: extension.toUpperCase(), thumbnail: null }
  try {
    const info = await stat(path)
    if (info.isDirectory()) {
      return { path, summary: { ...base, sizeBytes: 0, kind: null, error: 'Folders can’t be attached.' } }
    }
    const kind = await detectKind(path, extension)
    const error = kind ? sizeError(kind, info.size) : 'This file type isn’t supported yet.'
    return { path, summary: { ...base, sizeBytes: info.size, kind, thumbnail: await createThumbnail(path), error } }
  } catch {
    return { path, summary: { ...base, sizeBytes: 0, kind: null, error: 'This file couldn’t be read.' } }
  }
}

/** Replaces the session's files with these paths (up to the limit) and returns what the panel shows for them. */
async function capture(paths: string[]): Promise<AttachmentSummary[]> {
  const stored = await Promise.all(paths.slice(0, MAX_ATTACHMENTS).map(describe))
  current = new Map(stored.map((attachment) => [attachment.summary.id, attachment]))
  return stored.map((attachment) => attachment.summary)
}

/** Forgets the session's files. */
function clear(): void {
  current = new Map()
}

/** Converts an image macOS can read but OpenAI can't (HEIC, TIFF…) to JPEG with `sips`, returning the JPEG bytes. */
async function convertToJpeg(path: string): Promise<Buffer> {
  const output = join(tmpdir(), `phasetype-${randomUUID()}.jpg`)
  try {
    await runFile('/usr/bin/sips', ['-s', 'format', 'jpeg', path, '--out', output], { timeoutMs: CONVERT_TIMEOUT_MS })
    return await readFile(output)
  } finally {
    await rm(output, { force: true })
  }
}

/** Cuts text to the length limit, noting that it was cut. */
const truncate = (text: string): string =>
  text.length > MAX_TEXT_CHARS ? `${text.slice(0, MAX_TEXT_CHARS)}\n\n[…the rest of the file was cut off]` : text

/** Reads one file's contents in the form its kind is sent in. Throws a readable error if it can't. */
async function load({ path, summary }: StoredAttachment): Promise<LoadedAttachment> {
  const { name, kind } = summary
  const extension = extname(path).slice(1).toLowerCase()
  switch (kind) {
    case 'image': {
      if (CONVERTIBLE_IMAGE_EXTENSIONS.includes(extension)) {
        return { kind: 'image', name, dataUrl: `data:image/jpeg;base64,${(await convertToJpeg(path)).toString('base64')}` }
      }
      return { kind: 'image', name, dataUrl: `data:${IMAGE_MIME_TYPES[extension]};base64,${(await readFile(path)).toString('base64')}` }
    }
    case 'pdf':
      return { kind: 'pdf', name, dataUrl: `data:application/pdf;base64,${(await readFile(path)).toString('base64')}` }
    case 'document': {
      const text = await runFile('/usr/bin/textutil', ['-convert', 'txt', '-stdout', path], { timeoutMs: CONVERT_TIMEOUT_MS })
      return { kind: 'text', name, text: truncate(text) }
    }
    case 'text':
      return { kind: 'text', name, text: truncate(await readFile(path, 'utf8')) }
    default:
      throw new Error(`${name}: ${summary.error ?? 'This file type isn’t supported yet.'}`)
  }
}

/**
 * Reads the contents of the session's files with these ids, skipping unknown ids and files that can't be sent.
 * Throws a readable error naming the file if reading or converting one fails.
 */
async function loadAll(ids: string[]): Promise<LoadedAttachment[]> {
  const attachments = ids
    .map((id) => current.get(id))
    .filter((attachment): attachment is StoredAttachment => Boolean(attachment && !attachment.summary.error))
  return Promise.all(
    attachments.map(async (attachment) => {
      try {
        return await load(attachment)
      } catch (error) {
        throw new Error(`Couldn’t read ${attachment.summary.name}. ${error instanceof Error ? error.message : ''}`.trim())
      }
    })
  )
}

/** Keeps the files selected when the panel opened, and reads them for AI requests. */
export const attachmentService = { capture, clear, loadAll }
