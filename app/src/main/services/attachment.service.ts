import { nativeImage } from 'electron'
import { randomUUID } from 'crypto'
import { mkdtemp, open, readFile, rm, stat } from 'fs/promises'
import { tmpdir } from 'os'
import { basename, extname, join } from 'path'
import type { AttachmentKind, AttachmentSummary } from '@shared/types'
import {
  AUDIO_CHUNK_SECONDS,
  BINARY_SNIFF_BYTES,
  CONVERT_TIMEOUT_MS,
  CONVERTIBLE_IMAGE_EXTENSIONS,
  DOCUMENT_EXTENSIONS,
  IMAGE_EXTENSIONS,
  IMAGE_MIME_TYPES,
  MAX_ATTACHMENTS,
  MAX_IMAGE_BYTES,
  MAX_MEDIA_SECONDS,
  MAX_PDF_BYTES,
  MAX_TEXT_CHARS,
  MAX_TEXT_FILE_BYTES,
  MAX_VIDEO_FRAMES,
  MEDIA_EXTENSIONS,
  SECONDS_PER_VIDEO_FRAME,
  TEXT_EXTENSIONS,
  THUMBNAIL_SIZE
} from '../constants'
import type { LoadAttachmentsOptions, LoadedAttachment, StoredAttachment } from '../types'
import { runFile } from '../utils'
import { mediaService } from './media.service'

/** The files captured for the current panel session, by id. Replaced on every capture. */
let current = new Map<string, StoredAttachment>()
/**
 * Audio and video already transcribed this session, by id. Transcribing costs money and takes a while, so follow-ups
 * reuse the first result. A failed load is dropped, so the next request tries again.
 */
let loadedMedia = new Map<string, { loading: Promise<LoadedAttachment>; signal: AbortSignal }>()

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

/** Decides whether a recording is sent as audio or video from its tracks, and why it can't be sent, if so. */
async function describeMedia(path: string): Promise<Pick<AttachmentSummary, 'kind' | 'durationSeconds' | 'error'>> {
  const { durationSeconds, hasAudio, hasVideo } = await mediaService.inspect(path)
  const kind: AttachmentKind | null = hasVideo ? 'video' : hasAudio ? 'audio' : null
  if (!kind) return { kind, durationSeconds, error: 'This file has no sound or picture.' }
  const tooLong = durationSeconds > MAX_MEDIA_SECONDS
  return { kind, durationSeconds, error: tooLong ? `Audio and video can be up to ${MAX_MEDIA_SECONDS / 3600} hours long.` : null }
}

/** Looks at one file and describes it for the panel, including why it can't be sent, if so. */
async function describe(path: string): Promise<StoredAttachment> {
  const name = basename(path)
  const extension = extname(path).slice(1).toLowerCase()
  const base = { id: randomUUID(), name, extension: extension.toUpperCase(), durationSeconds: null, thumbnail: null }
  try {
    const info = await stat(path)
    if (info.isDirectory()) {
      return { path, summary: { ...base, sizeBytes: 0, kind: null, error: 'Folders can’t be attached.' } }
    }
    if (MEDIA_EXTENSIONS.includes(extension)) {
      const media = await describeMedia(path)
      return { path, summary: { ...base, ...media, sizeBytes: info.size, thumbnail: await createThumbnail(path) } }
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
  loadedMedia = new Map()
  return stored.map((attachment) => attachment.summary)
}

/** Forgets the session's files. */
function clear(): void {
  current = new Map()
  loadedMedia = new Map()
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

/** How many frames to take: one every few seconds, at least one, up to the cap. */
const videoFrameCount = (durationSeconds: number): number =>
  Math.min(MAX_VIDEO_FRAMES, Math.max(1, Math.ceil(durationSeconds / SECONDS_PER_VIDEO_FRAME)))

/** Cuts a recording into audio clips and frames, transcribes the clips, and returns the transcript and frames. */
async function loadMedia({ path, summary }: StoredAttachment, { transcribe, onStatus, signal }: LoadAttachmentsOptions): Promise<LoadedAttachment> {
  const { name, kind } = summary
  const durationSeconds = summary.durationSeconds ?? 0
  const outputDir = await mkdtemp(join(tmpdir(), 'phasetype-media-'))
  try {
    onStatus(kind === 'video' ? `Reading ${name}…` : `Preparing ${name}…`)
    const { audioPaths, frames } = await mediaService.prepare(path, {
      outputDir,
      frameCount: kind === 'video' ? videoFrameCount(durationSeconds) : 0,
      chunkSeconds: AUDIO_CHUNK_SECONDS,
      signal
    })

    let transcript: string | null = null
    if (audioPaths.length) {
      onStatus(`Transcribing ${name}…`)
      const parts = await Promise.all(
        audioPaths.map(async (audioPath) => transcribe({ filename: basename(audioPath), data: await readFile(audioPath) }))
      )
      transcript = truncate(parts.map((part) => part.trim()).filter(Boolean).join('\n\n'))
    }

    const loadedFrames = await Promise.all(
      frames.map(async (frame) => ({ seconds: frame.seconds, dataUrl: `data:image/jpeg;base64,${(await readFile(frame.path)).toString('base64')}` }))
    )
    return { kind: 'media', name, durationSeconds, transcript, frames: loadedFrames }
  } finally {
    await rm(outputDir, { recursive: true, force: true })
  }
}

/** Loads a recording once per session, sharing the result with later requests. */
function loadMediaOnce(attachment: StoredAttachment, options: LoadAttachmentsOptions): Promise<LoadedAttachment> {
  const { id } = attachment.summary
  const cached = loadedMedia.get(id)
  // A load started by a request that was cancelled is failing, even if it hasn't rejected yet.
  if (cached && !cached.signal.aborted) return cached.loading
  const loading = loadMedia(attachment, options)
  loadedMedia.set(id, { loading, signal: options.signal })
  loading.catch(() => {
    if (loadedMedia.get(id)?.loading === loading) loadedMedia.delete(id)
  })
  return loading
}

/** Reads one file's contents in the form its kind is sent in. Throws a readable error if it can't. */
async function load(attachment: StoredAttachment, options: LoadAttachmentsOptions): Promise<LoadedAttachment> {
  const { path, summary } = attachment
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
    case 'audio':
    case 'video':
      return loadMediaOnce(attachment, options)
    default:
      throw new Error(`${name}: ${summary.error ?? 'This file type isn’t supported yet.'}`)
  }
}

/**
 * Reads the contents of the session's files with these ids, skipping unknown ids and files that can't be sent.
 * Audio and video are transcribed with `options.transcribe`. Throws a readable error naming the file if reading,
 * converting or transcribing one fails, or an AbortError if `options.signal` aborts.
 */
async function loadAll(ids: string[], options: LoadAttachmentsOptions): Promise<LoadedAttachment[]> {
  const attachments = ids
    .map((id) => current.get(id))
    .filter((attachment): attachment is StoredAttachment => Boolean(attachment && !attachment.summary.error))
  return Promise.all(
    attachments.map(async (attachment) => {
      try {
        return await load(attachment, options)
      } catch (error) {
        if (options.signal.aborted) throw error
        throw new Error(`Couldn’t read ${attachment.summary.name}. ${error instanceof Error ? error.message : ''}`.trim())
      }
    })
  )
}

/** Names of the session's files with these ids that can be sent, for the usage history. */
const namesOf = (ids: string[]): string[] =>
  ids.flatMap((id) => {
    const attachment = current.get(id)
    return attachment && !attachment.summary.error ? [attachment.summary.name] : []
  })

/** Keeps the files selected when the panel opened, and reads them (transcribing audio and video) for AI requests. */
export const attachmentService = { capture, clear, loadAll, namesOf }
