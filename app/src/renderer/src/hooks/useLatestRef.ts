import { useLayoutEffect, useRef, type RefObject } from 'react'

/** Keeps a ref pointing at the latest value, so listeners registered once always see fresh props. */
export function useLatestRef<T>(value: T): RefObject<T> {
  const ref = useRef(value)
  useLayoutEffect(() => {
    ref.current = value
  })
  return ref
}
