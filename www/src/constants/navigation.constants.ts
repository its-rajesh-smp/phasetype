import type { FooterLinkGroup, NavLink } from '@/types/navigation.types'

export const HOME_LINK: NavLink = { label: 'Home', href: '#top' }

export const NAV_LINKS: NavLink[] = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Privacy', href: '#privacy' },
  { label: 'FAQ', href: '#faq' }
]

/** Section ids the header watches to highlight the current link. */
export const NAV_SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1))

export const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    title: 'Product',
    links: [
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Examples', href: '#examples' },
      { label: 'Features', href: '#features' }
    ]
  },
  {
    title: 'Trust',
    links: [
      { label: 'Privacy', href: '#privacy' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Download', href: '#download' }
    ]
  }
]
