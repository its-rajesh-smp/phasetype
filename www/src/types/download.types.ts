export type DownloadArch = 'arm64' | 'x64'

export interface DownloadOption {
  arch: DownloadArch
  label: string
  detail: string
  href: string
}
