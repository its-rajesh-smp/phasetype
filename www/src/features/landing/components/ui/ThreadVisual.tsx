'use client'

import { useInView } from '@/hooks/useInView'
import { cn } from '@/utils/cn.util'
import { useThreadSequence } from '../../hooks/useThreadSequence'
import type { ThreadMessage } from '../../types/landing.types'
import { Caret } from './Caret'
import { WaveDots } from './WaveDots'

/** A short chat that plays while on screen: you ask, PhaseType streams a reply, you refine, it streams again. */
export function ThreadVisual({ messages }: { messages: ThreadMessage[] }) {
  const [ref, inView] = useInView<HTMLDivElement>()
  const { visible, streaming } = useThreadSequence(messages, inView)

  return (
    // The thread has no height of its own: it fills whatever the bento row leaves, and older messages fade off the top.
    <div ref={ref} aria-hidden className="relative min-h-44 flex-1 lg:min-h-0">
      <div className="absolute inset-0 flex flex-col justify-end gap-2 overflow-hidden mask-[linear-gradient(to_bottom,transparent,black_28%)]">
        {visible.map((message, index) => {
          const isLast = index === visible.length - 1
          const fromYou = message.from === 'you'

          return (
            <p
              key={index}
              className={cn(
                'max-w-[88%] shrink-0 animate-pop-in rounded-2xl px-3.5 py-2 text-sm leading-snug',
                fromYou
                  ? 'self-end rounded-br-md bg-violet-ink text-white'
                  : 'self-start rounded-bl-md border border-white bg-surface/90 text-ink shadow-card'
              )}
            >
              {message.text === '' ? (
                <span className="flex h-5 items-center">
                  <WaveDots dotClassName="bg-violet-ink" />
                </span>
              ) : (
                message.text
              )}
              {isLast && streaming && message.text !== '' && <Caret className="bg-violet-ink" />}
            </p>
          )
        })}
      </div>
    </div>
  )
}
