import type { DownloadArch } from '@/types/download.types'

export interface ReleaseAsset {
  arch: DownloadArch
  url: string
  sizeBytes: number
}

export interface Release {
  /** Without the leading "v", e.g. "0.2.0". */
  version: string
  tag: string
  /** ISO date. */
  publishedAt: string
  /** Release notes as written on GitHub (markdown). */
  notes: string
  url: string
  /** The .dmg files, Apple Silicon first. */
  assets: ReleaseAsset[]
}

export type ReleaseNoteBlock = { kind: 'heading' | 'item' | 'text'; text: string }
