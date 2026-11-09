import type { DownloadArch } from '@/types/download.types'

interface UADataWithArch {
  getHighEntropyValues: (hints: string[]) => Promise<{ architecture?: string }>
}

/** Chromium browsers report the CPU directly. Safari and Firefox don't support this. */
async function archFromClientHints(): Promise<DownloadArch | null> {
  const uaData = (navigator as Navigator & { userAgentData?: UADataWithArch }).userAgentData
  if (!uaData?.getHighEntropyValues) return null
  try {
    const { architecture } = await uaData.getHighEntropyValues(['architecture'])
    if (architecture === 'arm') return 'arm64'
    if (architecture === 'x86') return 'x64'
  } catch {
    // Hints can be blocked; fall through to the GPU check.
  }
  return null
}

/** The GPU name gives it away: Apple Silicon reports "Apple M1" or "Apple GPU", Intel Macs an Intel, AMD or NVIDIA GPU. */
function archFromGpu(): DownloadArch | null {
  try {
    const gl = document.createElement('canvas').getContext('webgl')
    if (!gl) return null
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
    const renderer = String(gl.getParameter(debugInfo ? debugInfo.UNMASKED_RENDERER_WEBGL : gl.RENDERER))
    if (/apple/i.test(renderer)) return 'arm64'
    if (/intel|amd|radeon|nvidia/i.test(renderer)) return 'x64'
  } catch {
    // No WebGL; can't tell.
  }
  return null
}

/** Best guess at the visitor's Mac architecture, or null when it isn't a Mac or can't be told. */
export async function detectMacArch(): Promise<DownloadArch | null> {
  if (!/Macintosh|Mac OS X/i.test(navigator.userAgent)) return null
  return (await archFromClientHints()) ?? archFromGpu()
}
