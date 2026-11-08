import { RELEASES_REPO } from '@/constants/download.constants'
import type { DownloadArch } from '@/types/download.types'
import type { Release, ReleaseAsset } from '../types/release.types'

/** Refetch the list from GitHub at most once an hour (unauthenticated GitHub allows 60 requests an hour). */
export const RELEASES_REVALIDATE_SECONDS = 3600

const API_URL = `https://api.github.com/repos/${RELEASES_REPO}/releases?per_page=30`
const DMG_NAME = /^PhaseType-(arm64|x64)\.dmg$/

interface GithubAsset {
  name: string
  browser_download_url: string
  size: number
}

interface GithubRelease {
  tag_name: string
  html_url: string
  body: string | null
  draft: boolean
  prerelease: boolean
  published_at: string | null
  assets: GithubAsset[]
}

function toAsset(asset: GithubAsset): ReleaseAsset | null {
  const arch = DMG_NAME.exec(asset.name)?.[1] as DownloadArch | undefined
  return arch ? { arch, url: asset.browser_download_url, sizeBytes: asset.size } : null
}

function toRelease(release: GithubRelease): Release {
  const assets = release.assets
    .map(toAsset)
    .filter((asset): asset is ReleaseAsset => asset !== null)
    .sort((a, b) => a.arch.localeCompare(b.arch))
  return {
    version: release.tag_name.replace(/^v/, ''),
    tag: release.tag_name,
    publishedAt: release.published_at ?? '',
    notes: release.body ?? '',
    url: release.html_url,
    assets
  }
}

/** Published releases, newest first. Returns an empty list if GitHub can't be reached, so the page still renders. */
export async function getReleases(): Promise<Release[]> {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Accept: 'application/vnd.github+json',
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
      },
      next: { revalidate: RELEASES_REVALIDATE_SECONDS }
    })
    if (!response.ok) throw new Error(`GitHub responded ${response.status}`)
    const releases = (await response.json()) as GithubRelease[]
    return releases.filter((release) => !release.draft && !release.prerelease).map(toRelease)
  } catch (error) {
    console.error('[download] Could not load releases.', error)
    return []
  }
}
