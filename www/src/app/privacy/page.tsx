import type { Metadata } from 'next'
import { LegalPage } from '@/features/legal/components/LegalPage'
import { PRIVACY_POLICY } from '@/features/legal/constants/privacy.constants'

export const metadata: Metadata = {
  title: PRIVACY_POLICY.title,
  description: PRIVACY_POLICY.summary,
  alternates: { canonical: '/privacy' },
  openGraph: { url: '/privacy', title: PRIVACY_POLICY.title, description: PRIVACY_POLICY.summary }
}

export default function PrivacyPolicyPage() {
  return <LegalPage document={PRIVACY_POLICY} />
}
