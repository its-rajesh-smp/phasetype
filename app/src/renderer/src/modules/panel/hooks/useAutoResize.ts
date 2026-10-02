import { useLayoutEffect, type RefObject } from 'react'
import { bridge } from '../../../services/bridge.service'

/** Keeps the native panel window exactly as tall as its content. */
export function useAutoResize(ref: RefObject<HTMLElement | null>): void {
  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new ResizeObserver(() => bridge.panel.resize(Math.ceil(element.getBoundingClientRect().height)))
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref])
}
