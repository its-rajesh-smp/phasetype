import type { Metadata } from 'next'
import { LegalPage } from '@/features/legal/components/LegalPage'
import { TERMS_AND_CONDITIONS } from '@/features/legal/constants/terms.constants'

export const metadata: Metadata = {
  title: TERMS_AND_CONDITIONS.title,
  description: TERMS_AND_CONDITIONS.summary,
  alternates: { canonical: '/terms' },
  openGraph: { url: '/terms', title: TERMS_AND_CONDITIONS.title, description: TERMS_AND_CONDITIONS.summary }
}

export default function TermsPage() {
  return <LegalPage document={TERMS_AND_CONDITIONS} />
}
