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
    ├── try/             # the /try playground: editor, live panel, and the /api/try helpers (prompt, limits, rate limit)
    ├── landing/
    │   ├── components/  # sections/, ui/, panel/ (panel mock), demo/ (hero demo)
    │   ├── constants/   # all page copy: steps, features, examples, FAQ, privacy…
    │   ├── helpers/     # demo scene builder, JSON-LD builder
    │   ├── hooks/       # useDemoSequence
    │   └── types/
    └── seo/             # share image card and renderer
```

Design tokens live in `src/app/globals.css` and match the app (`app/src/renderer/src/styles/globals.css`).

## Try in the browser (`/try`)

The playground streams real answers through `src/app/api/try/route.ts`, using the site's own OpenAI key. It needs a
server runtime (e.g. Vercel), not a static export. Set these in the host's environment (or a git-ignored `.env.local`):

- `OPENAI_API_KEY` (required): billed for every try.
- `TRY_OPENAI_MODEL` (optional): defaults to `gpt-4.1-mini`.

Limits live in `src/features/try/constants/limits.constants.ts`: 2,000 characters per selection, 700 output tokens,
6 tries a minute and 20 a day per IP, and 1,500 a day overall. The counts are in memory per server instance, so they
are a cost guard, not an exact quota; move them to a shared store such as Redis if traffic grows.

## Before launch

- Replace the placeholder download links in `src/constants/download.constants.ts`.
- `SITE.url` in `src/constants/site.constants.ts` drives canonical URLs, the sitemap and structured data.
