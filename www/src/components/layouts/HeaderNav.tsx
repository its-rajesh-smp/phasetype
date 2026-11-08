'use client'

import { Download } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Logo } from '@/components/ui/Logo'
import { PRIMARY_DOWNLOAD } from '@/constants/download.constants'
import { HOME_LINK, NAV_SECTION_IDS, TRY_LINK } from '@/constants/navigation.constants'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/utils/cn.util'
import { NavLinks } from './NavLinks'

/** The floating pill nav. On the home page it tracks the section in view and firms up its shadow once the page scrolls. */
export function HeaderNav() {
  const scrolled = useScrolled()
  const activeId = useActiveSection(NAV_SECTION_IDS)
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <nav
      aria-label="Main"
      className={cn(
        'mx-auto flex h-14 max-w-3xl items-center justify-between gap-4 rounded-full border border-line/80 bg-surface/75 pr-2 pl-5 backdrop-blur-xl transition-shadow duration-300',
        scrolled ? 'shadow-float' : 'shadow-card'
      )}
    >
      <a href={HOME_LINK.href} aria-label="PhaseType home" className="flex items-center rounded-lg">
        <Logo />
      </a>
      <NavLinks activeHref={isHome ? (activeId ? `/#${activeId}` : HOME_LINK.href) : undefined} />
      <div className="flex items-center gap-1.5">
        {pathname !== TRY_LINK.href && (
          <ButtonLink href={TRY_LINK.href} variant="secondary" size="sm" className="hidden shadow-none sm:inline-flex">
            {TRY_LINK.label}
          </ButtonLink>
        )}
        <ButtonLink href={PRIMARY_DOWNLOAD.href} size="sm" leadingIcon={<Download aria-hidden className="size-3.5" />}>
          Download
        </ButtonLink>
      </div>
    </nav>
  )
}
