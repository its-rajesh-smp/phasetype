import { SITE } from '@/constants/site.constants'
import { DOWNLOAD_OPTIONS } from '@/constants/download.constants'
import { FAQ_ENTRIES } from '../constants/faq.constants'
import { FEATURES } from '../constants/features.constants'

/** schema.org graph for the landing page: the app, the website and the FAQ. */
export function buildLandingStructuredData(): object {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE.url}/#app`,
        name: SITE.name,
        description: SITE.description,
        url: SITE.url,
        image: `${SITE.url}/icon.png`,
        applicationCategory: 'ProductivityApplication',
        operatingSystem: 'macOS',
        softwareVersion: SITE.version,
        downloadUrl: DOWNLOAD_OPTIONS.map((option) => option.href),
        featureList: FEATURES.map((feature) => feature.title),
        author: { '@type': 'Person', name: SITE.author }
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        name: SITE.name,
        url: SITE.url,
        inLanguage: 'en'
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE.url}/#faq`,
        mainEntity: FAQ_ENTRIES.map((entry) => ({
          '@type': 'Question',
          name: entry.question,
          acceptedAnswer: { '@type': 'Answer', text: entry.answer }
        }))
      }
    ]
  }
}
