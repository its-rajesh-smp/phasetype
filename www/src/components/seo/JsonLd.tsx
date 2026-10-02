import { serializeJsonLd } from '@/utils/jsonLd.util'

/** Renders structured data for search engines as a JSON-LD script tag. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />
}
