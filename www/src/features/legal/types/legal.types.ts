import type { StaticImageData } from 'next/image'

export interface LegalSection {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
}

export interface LegalDocument {
  title: string
  /** One line under the title in the banner. */
  summary: string
  /** Human-readable date the document last changed. */
  updated: string
  /** Banner landscape; every legal page gets its own image. */
  banner: StaticImageData
  sections: LegalSection[]
}
