import { AudioLines, FileCode, FileText, Film, Image } from 'lucide-react'
import type { DemoAttachment, FileKind } from '../types/landing.types'

/** What the panel can read when files are selected in Finder. Mirrors the app's attachment limits. */
export const FILE_KINDS: FileKind[] = [
  { icon: FileText, name: 'PDFs and documents', formats: 'PDF, Word, RTF, OpenDocument, web pages', tone: 'peach' },
  { icon: Image, name: 'Images', formats: 'PNG, JPEG, HEIC, WebP, GIF, TIFF', tone: 'sky' },
  { icon: AudioLines, name: 'Audio', formats: 'MP3, M4A, WAV, FLAC · transcribed, up to 2 hours', tone: 'violet' },
  { icon: Film, name: 'Video', formats: 'MP4, MOV, M4V · sound transcribed, frames read', tone: 'mint' },
  { icon: FileCode, name: 'Text and code', formats: 'Markdown, CSV, JSON and source files', tone: 'plain' }
]

/** Up to this many files are attached at once. */
export const MAX_FILES = 5

/** The panel still in the files section: two files from Finder and a question about them. */
export const FILES_DEMO = {
  attachments: [
    { name: 'Q3-board-deck.pdf', detail: '24 pages', kind: 'document' },
    { name: 'kickoff-call.m4a', detail: '38 min', kind: 'audio' }
  ] satisfies DemoAttachment[],
  prompt: 'Pull out the action items',
  result: '• Maya sends the revised budget by Friday\n• Dev confirms the launch date with QA\n• Everyone reviews the pricing page before Monday'
} as const
