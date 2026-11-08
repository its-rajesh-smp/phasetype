import { useLayoutEffect, useRef, type RefObject } from 'react'

/** A ref that always holds the latest value, for event listeners that shouldn't re-subscribe on every render. */
export function useLatestRef<T>(value: T): RefObject<T> {
  const ref = useRef(value)
  useLayoutEffect(() => {
    ref.current = value
  })
  return ref
}
