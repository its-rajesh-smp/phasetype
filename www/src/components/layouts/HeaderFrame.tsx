'use client'

import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/utils/cn.util'

/** Sticky header wrapper that gains a frosted background and border once the page scrolls. */
export function HeaderFrame({ children }: { children: React.ReactNode }) {
  const scrolled = useScrolled()

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled ? 'border-line bg-canvas/80 backdrop-blur-xl' : 'border-transparent bg-transparent'
      )}
    >
      {children}
    </header>
  )
}
