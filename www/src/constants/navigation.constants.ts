import type { FooterLinkGroup, NavLink } from '@/types/navigation.types'

export const NAV_LINKS: NavLink[] = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Examples', href: '#examples' },
  { label: 'Features', href: '#features' },
  { label: 'Privacy', href: '#privacy' },
  { label: 'FAQ', href: '#faq' }
]

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
