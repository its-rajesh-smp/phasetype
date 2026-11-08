import type { DownloadArch, DownloadOption } from '@/types/download.types'
import { SITE } from './site.constants'

/**
 * GitHub repo whose Releases host the app files. Each release is tagged `v<version>` and has `PhaseType-<arch>.dmg`
 * and `PhaseType-<arch>.zip`, uploaded by `yarn release:mac` in app/. The repo must be public for downloads to work.
 */
export const RELEASES_REPO = 'its-rajesh-smp/phasetype'
export const RELEASES_URL = `https://github.com/${RELEASES_REPO}/releases`

/** The installer script, served from public/install.sh. */
export const INSTALL_SCRIPT_URL = `${SITE.url}/install.sh`
export const INSTALL_COMMAND = `curl -fsSL ${INSTALL_SCRIPT_URL} | sh`

/** Direct link to a release's .dmg. `latest` always points at the newest published release. */
export const dmgUrl = (arch: DownloadArch, tag: string | 'latest' = 'latest'): string =>
  tag === 'latest' ? `${RELEASES_URL}/latest/download/PhaseType-${arch}.dmg` : `${RELEASES_URL}/download/${tag}/PhaseType-${arch}.dmg`

/** The newest .dmg for each Mac architecture. Only offered on the download page, next to the steps for opening it. */
export const DOWNLOAD_OPTIONS: DownloadOption[] = [
  { arch: 'arm64', label: 'Apple Silicon', detail: 'M1 and later', href: dmgUrl('arm64') },
  { arch: 'x64', label: 'Intel', detail: 'Intel processors', href: dmgUrl('x64') }
]

/** Every download button on the site leads to the download page, which explains how to install and open the app. */
export const PRIMARY_DOWNLOAD = { label: 'Download for Mac', href: '/download' } as const
