import { useEffect, useRef, useState, type RefObject } from 'react'

/** Whether the referenced element is on screen. With `once`, it stays true after the first time it appears. */
export function useInView<T extends Element>(once = false): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting && once) observer.disconnect()
      },
      { threshold: 0.35 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [once])

  return [ref, inView]
}
