# phasetype.ink

Landing page for PhaseType, built with Next.js 16 (App Router), React 19 and Tailwind CSS v4.

```bash
yarn
yarn dev     # http://localhost:3000
yarn build   # static production build
yarn lint
```

## Structure

```
src/
├── app/                 # layout (metadata), page, sitemap, robots, manifest, OG/Twitter images, icons
├── components/
│   ├── ui/              # stateless primitives: ButtonLink, Kbd, KeyCombo, Marker, Logo, SectionHeading…
│   ├── layouts/         # AnnouncementBar, SiteHeader, SiteFooter
│   └── seo/             # JsonLd
├── constants/           # site info, download links, navigation
├── hooks/               # useScrolled, usePrefersReducedMotion
├── types/  utils/
└── features/
    ├── landing/
    │   ├── components/  # sections/, ui/, panel/ (panel mock), demo/ (hero demo)
    │   ├── constants/   # all page copy: steps, features, examples, FAQ, privacy…
    │   ├── helpers/     # demo scene builder, JSON-LD builder
    │   ├── hooks/       # useDemoSequence
    │   └── types/
    └── seo/             # share image card and renderer
```

Design tokens live in `src/app/globals.css` and match the app (`app/src/renderer/src/styles/globals.css`).

## Before launch

- Replace the placeholder download links in `src/constants/download.constants.ts`.
- `SITE.url` in `src/constants/site.constants.ts` drives canonical URLs, the sitemap and structured data.
