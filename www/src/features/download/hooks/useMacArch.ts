import { useEffect, useState } from 'react'
import type { DownloadArch } from '@/types/download.types'
import { detectMacArch } from '../helpers/detectArch.helper'

/** The visitor's Mac architecture, detected after mount. Null until known, or when it can't be told. */
export function useMacArch(): DownloadArch | null {
  const [arch, setArch] = useState<DownloadArch | null>(null)

  useEffect(() => {
    let active = true
    detectMacArch().then((detected) => {
      if (active) setArch(detected)
    })
    return () => {
      active = false
    }
  }, [])

  return arch
}
