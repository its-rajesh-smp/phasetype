import type { MetadataRoute } from 'next'
import { LEGAL_LINKS } from '@/constants/navigation.constants'
import { SITE } from '@/constants/site.constants'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    },
    ...Object.values(LEGAL_LINKS).map((link) => ({
      url: `${SITE.url}${link.href}`,
      changeFrequency: 'yearly' as const,
      priority: 0.3
    }))
  ]
}
