import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import type { ThreadMessage } from '../types/landing.types'

const WORD_MS = 90
const PAUSE_MS = 900
const HOLD_MS = 3200

export interface ThreadFrame {
  /** Messages on screen, the last one possibly still streaming. */
  visible: ThreadMessage[]
  streaming: boolean
}

/** Plays a chat thread while `active`: your messages appear whole, replies stream in word by word, then it loops. */
export function useThreadSequence(messages: ThreadMessage[], active: boolean): ThreadFrame {
  const reducedMotion = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [words, setWords] = useState(0)

  const current = messages[index]
  const total = current.text.split(' ').length
  const isStreaming = current.from === 'phasetype' && words < total

  useEffect(() => {
    if (!active || reducedMotion) return

    const isLast = index === messages.length - 1
    const timer = setTimeout(
      () => {
        if (isStreaming) return setWords((count) => count + 1)
        setWords(0)
        setIndex(isLast ? 0 : index + 1)
      },
      isStreaming ? WORD_MS : isLast ? HOLD_MS : PAUSE_MS
    )

    return () => clearTimeout(timer)
  }, [active, reducedMotion, index, isStreaming, messages.length])

  if (reducedMotion) return { visible: messages, streaming: false }

  const shown = current.from === 'phasetype' ? { ...current, text: current.text.split(' ').slice(0, words).join(' ') } : current
  return { visible: [...messages.slice(0, index), shown], streaming: isStreaming }
}
