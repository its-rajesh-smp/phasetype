import type { FooterLinkGroup, NavLink } from '@/types/navigation.types'

/** Root-relative links so the nav and footer also work from the legal pages. */
export const HOME_LINK: NavLink = { label: 'Home', href: '/#top' }

/** The in-browser playground, for visitors who want to try PhaseType before downloading. */
export const TRY_LINK: NavLink = { label: 'Try now', href: '/try' }

/** Install options, the one-time macOS approval and every version's notes. */
export const DOWNLOAD_LINK: NavLink = { label: 'Download', href: '/download' }

export const NAV_LINKS: NavLink[] = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Features', href: '/#features' },
  { label: 'FAQ', href: '/#faq' }
]

/** Section ids the header watches to highlight the current link. */
export const NAV_SECTION_IDS = NAV_LINKS.map((link) => link.href.split('#')[1])

export const LEGAL_LINKS = {
  privacy: { label: 'Privacy policy', href: '/privacy' },
  terms: { label: 'Terms and conditions', href: '/terms' }
} as const satisfies Record<string, NavLink>

export const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    title: 'Product',
    links: [
      DOWNLOAD_LINK,
      TRY_LINK,
      { label: 'How it works', href: '/#how-it-works' },
      { label: 'Files', href: '/#files' },
      { label: 'Examples', href: '/#examples' },
      { label: 'Features', href: '/#features' }
    ]
  },
  {
    title: 'Trust',
    links: [
      { label: 'Privacy', href: '/#privacy' },
      { label: 'FAQ', href: '/#faq' },
      { label: 'Changelog', href: `${DOWNLOAD_LINK.href}#releases` }
    ]
  },
  {
    title: 'Legal',
    links: [LEGAL_LINKS.privacy, LEGAL_LINKS.terms]
  }
]
