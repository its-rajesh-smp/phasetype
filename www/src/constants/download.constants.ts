import type { DownloadOption } from '@/types/download.types'
import { SITE } from './site.constants'

// TODO: placeholder links. Point these at the real release files once hosting is ready.
export const DOWNLOAD_OPTIONS: DownloadOption[] = [
  {
    arch: 'arm64',
    label: 'Download for Mac',
    detail: 'Apple Silicon (M1 and later)',
    href: `${SITE.url}/download/PhaseType-${SITE.version}-arm64.dmg`
  },
  {
    arch: 'x64',
    label: 'Intel Mac',
    detail: 'Intel processors',
    href: `${SITE.url}/download/PhaseType-${SITE.version}-x64.dmg`
  }
]

export const PRIMARY_DOWNLOAD = DOWNLOAD_OPTIONS[0]
