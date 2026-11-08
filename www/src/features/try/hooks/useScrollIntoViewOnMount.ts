import { useEffect, useRef } from 'react'

const STACKED_QUERY = '(max-width: 1023px)'

/** On stacked (phone and tablet) layouts, scrolls the element into view when it appears, so a panel below the fold is seen. */
export function useScrollIntoViewOnMount<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (window.matchMedia(STACKED_QUERY).matches) ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [])

  return ref
}
