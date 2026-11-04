import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { SITE } from '@/constants/site.constants'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s · ${SITE.name}`
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.author }],
  creator: SITE.author,
  publisher: SITE.name,
  category: SITE.category,
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    locale: SITE.locale
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  }
}

export const viewport: Viewport = {
  themeColor: SITE.backgroundColor,
  colorScheme: 'light'
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.variable}>
      {/* Extensions (e.g. ones that set body styles) edit <body> before React loads; ignore those attribute diffs. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
