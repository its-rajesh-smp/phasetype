---
name: calm-product-design
description: Use this skill when designing or theming any product UI, marketing site, landing page, dashboard or app screen for this owner. Triggers include choosing colours, fonts, spacing, buttons, cards, navigation, hero sections, illustrations or background images, or "make it look like our other projects". Covers the visual language (tokens, type, colour rules, components, imagery and AI image generation, motion) and the owner's known likes and dislikes. Layout is NOT fixed by this skill; decide layout per project. Pair with frontend-skill.md for code conventions.
---

# Calm product design

A calm, airy, white-first look. One bright lime accent, Inter for everything, soft pastel tints for grouping, a dark "stage" to show the product, and quiet, high-resolution nature imagery. It should feel premium and modern, never loud.

Layout, section order and content change from project to project. What stays the same is everything below: tokens, type, colour rules, component styling, imagery and motion.

## The owner's taste (learned from real feedback)

Treat these as hard rules. Each one comes from something that was rejected or approved.

- **Calm over colourful.** A vivid saturated blue sky was rejected as "very very colourful". Backgrounds stay pale and low-saturation; colour is for small accents.
- **No cartoonish vector art.** A hand-drawn SVG landscape (flat hills, circle clouds and trees) was rejected as "cartoonish". Use real, high-quality imagery, or nothing.
- **Image quality matters.** An image upscaled on a large screen looked soft and blocky and was rejected. Source images must be at least as wide as the largest screen they fill.
- **Minimal hero.** Removed on request: the announcement bar, a badge above the headline, a secondary button, a platform line under the buttons, and a hotkey hint. The approved hero is a **headline, a one-line subtitle, one primary button, then the product visual**.
- **Short, plain copy.** A two-sentence subtitle was cut to one: "Select text in any app, press a hotkey, and PhaseType rewrites it in place."
- **Alignment is noticed.** A logo sitting 3px higher than the nav links was flagged. Check vertical centring of mixed items: logo, links and buttons.
- **Liked:** the floating pill nav with a lime active pill, pastel bento cards with coloured titles, the dark product stage, a sky-image card behind a feature block, and a misty, pale, sharp landscape behind the hero.
- **Reference sites:** timmo.co.in (the current direction: white, Inter, lime, pastel bento, nature imagery) and kerlig.com (for product positioning, not visuals). alvio.io's warm paper and serif look was the first theme and was replaced.

## Tokens

Use semantic names, never raw hex in components. This is the Tailwind v4 `@theme` block; for other stacks use the same values as CSS custom properties.

```css
@theme inline {
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-mono: ui-monospace, 'SF Mono', SFMono-Regular, Menlo, monospace;
}

@theme {
  /* Neutrals */
  --color-canvas: #fafafa;      /* page background */
  --color-surface: #ffffff;     /* cards, nav, inputs */
  --color-sunken: #f4f4f5;      /* wells, illustration panels, hover fills */
  --color-ink: #0a0a0a;         /* headings, primary buttons */
  --color-ink-soft: #262626;    /* strong body text */
  --color-muted: #525252;       /* body copy, descriptions */
  --color-subtle: #a3a3a3;      /* placeholders, meta, numbering */
  --color-line: #e5e5e5;        /* borders */
  --color-line-strong: #d4d4d4; /* key caps, dashed borders */

  /* The one accent */
  --color-lime: #bef264;        /* accent fill */
  --color-lime-deep: #a3e635;   /* accent hover */
  --color-lime-edge: #84cc16;   /* accent border and focus ring */

  /* Status (sparingly) */
  --color-ember: #ea7a1f;
  --color-danger: #dc2626;
  --color-success: #16a34a;

  /* Dark product stage */
  --color-stage: #171717;
  --color-stage-line: #2a2a2a;

  /* Pastel tints: card fill, card border, title colour */
  --color-violet-tint: #f6f1ff;  --color-violet-edge: #e6dbff;  --color-violet-ink: #7c3aed;
  --color-sky-tint: #eef6fd;     --color-sky-edge: #d4e8f8;     --color-sky-ink: #0284c7;
  --color-peach-tint: #fdf4e9;   --color-peach-edge: #f6e0c6;   --color-peach-ink: #c2410c;
  --color-mint-tint: #effbf1;    --color-mint-edge: #cdeed4;    --color-mint-ink: #15803d;

  /* Shadows: soft and low */
  --shadow-card: 0 1px 2px rgb(10 10 10 / 0.04), 0 12px 32px -20px rgb(10 10 10 / 0.18);
  --shadow-float: 0 8px 30px -12px rgb(10 10 10 / 0.18);
  --shadow-window: 0 1px 0 rgb(10 10 10 / 0.04), 0 30px 70px -30px rgb(0 0 0 / 0.6);
  --shadow-key: 0 2px 0 var(--color-line-strong);
}

/* Lime highlighter stroke across the lower half of key words. */
@utility marker {
  background-image: linear-gradient(to bottom, transparent 52%, var(--color-lime) 52%, var(--color-lime) 90%, transparent 90%);
  padding-inline: 0.06em;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}
```

Base: `body` is `bg-canvas text-ink font-sans antialiased` with Inter features `'cv11', 'ss01'`. Text selection is lime on ink.

## Typography

Inter only, loaded through the framework's font loader (`next/font/google` in Next.js). No serif. The monospace font is used only for numbers and code.

| Role | Size (mobile → desktop) | Weight | Tracking | Line height |
| --- | --- | --- | --- | --- |
| Hero h1 | 44px → 60px → 76px | 400 | -0.035em | 0.98 |
| Section h2 | 36px → 48px | 500 | -0.025em | 1.1 |
| Card title | 24px | 500 | -0.03 to -0.04em | tight |
| Body large (subtitles) | 18px → 20px | 400 | normal | relaxed |
| Body | 15px | 400 | normal | relaxed |
| Labels, nav, buttons | 13–16px | 600 | normal | normal |
| Big numbers | 36px → 48px mono | 400 | normal | normal |

- Big headings are **light (400) with tight tracking**; that contrast with the bold UI labels is the signature.
- Use `text-balance` on headings and `text-pretty` on paragraphs.
- Highlight one or two key words in a headline with `.marker`. Never a solid lime box: it overlaps neighbouring lines.
- Colour emphasis inside a title: the first words take a pastel `*-ink` colour and the rest stays ink (for example a sky-blue "Ask" then "for anything" in ink).

## Colour rules

- **White-first.** Most of the screen is canvas or surface. Colour appears in small doses.
- **Lime means "this one".** Use it for the active nav item, the highlighter, the secondary call to action, a "New" chip, or a selected state. Never for large areas or body text, and never on more than one or two elements per view.
- **Primary actions are black** (`bg-ink text-white`). The lime button is the secondary action, with a `lime-edge` border.
- **Pastels group content.** Each tinted card uses its tint, edge and ink trio together. Mix tones across a grid and leave some cards plain white so it doesn't turn into a rainbow.
- **Dark stage for the product.** Show screenshots or demos on `bg-stage` with a faint white grid and a very soft lime or sky glow. Light UI windows on a dark stage pop against the white page.
- Body text is `muted` on light backgrounds and `white/65` on dark ones. Keep contrast at AA or better.

## Shape and spacing

- **Radii:** buttons, nav, badges and chips are `rounded-full`. Inputs and small tiles use 12–16px. Cards use 28px. Feature panels and image cards use 32px. The product stage uses 28px.
- **Borders:** 1px `line` on every card; tinted cards use their `-edge` colour. Shadows stay soft (`shadow-card`). Avoid heavy drop shadows.
- **Container:** `max-w-6xl` with 16/24/32px side gutters. The nav is narrower (`max-w-3xl`).
- **Rhythm:** sections are `py-24 sm:py-32`. Heading to content is 48–56px. Grid gaps are 16–20px.
- **Phones:** design at 390px wide with no horizontal scroll. Side-by-side grids collapse to one column. Hide secondary nav links below 1024px rather than letting them wrap.

## Components

**Floating pill nav.** A sticky bar 12–16px from the top: `rounded-full`, `bg-surface/75 backdrop-blur-xl`, 1px border, `shadow-card` that becomes `shadow-float` on scroll. Logo on the left, links in the middle (13–14px, weight 600), and a black primary button on the right. The current section sits on a lime pill, tracked with an IntersectionObserver. Put the logo inside a `flex items-center` link and give the wordmark `leading-none` so it centres with the links.

**Buttons.** Pills, weight 600, heights 36/44/48px.
- Primary: `bg-ink text-white hover:bg-ink-soft`.
- Accent: `bg-lime border border-lime-edge/70 text-ink hover:bg-lime-deep`.
- Secondary: `bg-surface border border-line shadow-card`.
- Focus ring: 2px `lime-edge` with an offset.
- An icon before or after the label nudges 2px on hover.

**Pill badge** above section titles: `rounded-full border bg-surface px-3 py-1 text-[13px] font-medium shadow-card`. Centred with the heading by default; left-aligned headings align it to the start (don't let it stretch).

**Section heading:** badge, h2 and one or two lines of description in `muted`, centred and capped at `max-w-2xl`.

**Cards**
- Plain: `rounded-[28px] border border-line bg-surface p-6 sm:p-7 shadow-card`.
- Illustrated (stat or step card): an outer white card with `p-2`, holding a `bg-sunken rounded-[20px]` panel for a small visual, with a mono number, title and description below.
- Bento: a 4-column grid on desktop, some tiles spanning 2 columns. Wide tiles may hold a live-looking mini UI (a feed of rows, a list of shortcuts with "Available" marks). Fill every row; no empty cells.

**Key caps:** white, 1px `line-strong` border, `shadow-key`. Sizes 20/32/56px.

**Mini UI rows inside cards** (feeds, lists): white rows, `rounded-2xl`, `shadow-card`, a coloured icon square on the left, bold title with a muted timestamp, and a muted subline.

**Segmented tabs:** a white pill container with `p-1.5`; the active tab is a black pill and the others are muted with a sunken hover.

**FAQ:** a single white card split by dividers. Native `<details>` so it works without JavaScript; the plus icon sits in a sunken circle and turns lime and rotates when open.

**Facts row:** large monospace numbers with small muted labels, separated by vertical dividers, with a border above and below. Only use real, verifiable facts, never invented user counts.

**Footer:** light (`canvas`) with the logo, a short description, link columns, a giant faint wordmark (`line-strong` fading to transparent) and a copyright line.

## Imagery

Imagery should be calm, natural and sharp. Prefer AI-generated landscape or sky images over illustration.

### Hero landscape
- Near-white sky in the top ~70% with the centre left empty for the headline. The horizon sits at about 70% down, with land only in the bottom ~30%. Small trees only at the far left and right edges.
- The palette is low-saturation and hazy: pale cream or powder sky, muted sage hills, mist. The approved image was "misty morning, layered sage hills, faint peach glow".
- Position it behind the nav and hero (`absolute`, `object-cover object-bottom`) and fade only the bottom quarter into `canvas`. Pale skies need no extra wash.
- **Keep the land level with the main button on every screen.** Make the image box grow with the viewport width, for example `h-[600px] md:h-[calc(500px_+_19vw)]`. Re-measure whenever the hero's content changes height, because the visual below it moves up or down.

### Image cards
For a highlighted block such as privacy or a sponsor, use a painted sky with small foliage in the bottom corners (blossom petals at one corner, a tree canopy at the other). Add a left-to-right white wash (`from-white/55 via-white/15 to-transparent`) so text on the left stays readable.

### Generating images (OpenAI)
- **Model:** `gpt-image-2` (check `GET /v1/models` for newer stable ones; skip preview codenames). Use `quality: 'high'`.
- **Size:** the largest the budget allows. 3456×2304 (3:2) works; 3840×2560 is over the pixel budget. Sizes must be multiples of 16 and the longest edge at most 3840. A bad size is rejected before any charge, so use that to probe limits.
- **Cost:** every image is billed to the owner's OpenAI account. Generate 2–3 variants per round, not more, and say how many calls were made.
- **Key handling:** read `OPENAI_API_KEY` from a git-ignored `.env`, never print it, and make sure `.env` is in `.gitignore` before using it.
- **Prompt template** (the parts that mattered):
  > Wide 3:2 website hero background behind dark headline text, for a clean minimal white website. Calm, LOW SATURATION, soft, muted, airy, high-key, gentle haze, nothing vivid. The top 70% is open sky, very pale near the top, centre empty and smooth with no detailed clouds. The horizon is at about 70% from the top; landscape fills only the bottom 30%. Trees small and only at the far left and right edges. Smooth gradients, sharp, no noise. No people, animals, buildings, roads, text, logos or watermark. *[style line: e.g. layered misty sage hills, muted pastel; or hand-painted anime film background in a restrained pastel palette]*
- To get the painterly anime look, describe it ("hand-painted anime feature-film background, soft brushwork, sculpted clouds") rather than naming a studio, and always pair it with "restrained pastel, low saturation".
- **Post-process:** convert to WebP at quality 84–88 (smooth skies band below that), keep the full resolution, and import it statically so `next/image` adds a blur placeholder and responsive sizes.

## Motion

Subtle and purposeful. Never bouncy.

- Page load: the hero content rises 18px and fades in over 700ms (`cubic-bezier(0.2, 0.7, 0.2, 1)`), with a 150ms stagger for the visual.
- Scroll: sections fade up through a CSS scroll-driven animation (`animation-timeline: view()`), only inside `@supports` and `prefers-reduced-motion: no-preference`, so content is never hidden without it.
- Small UI: pop-in at 220ms, a 1s blinking caret, a shimmer placeholder, and pulsing wave dots for "working".
- Hover: colour changes and 2px nudges only.
- **Reduced motion:** turn off all animation and show a still, finished frame of any demo.

## Do and don't

**Do**
- Keep each view to one primary action and one lime highlight.
- Show the real product (a realistic mock or screenshot) on the dark stage near the top.
- Check every page at 390, 768, 1024, 1512 and 1920px wide with screenshots before calling it done.
- Keep headlines short and subtitles to one line.

**Don't**
- Use serif fonts, cream or "paper" backgrounds, or the old lime-to-ember gradient marker (that was the previous theme).
- Use saturated full-bleed colour, rainbow grids, or heavy shadows.
- Draw scenery with SVG or CSS shapes.
- Stack extra lines (badges, platform notes, hint rows) around the hero call to action.
- Invent numbers, ratings or testimonials.

## Adapting to a new project

1. Copy the token block. Keep the neutrals and pastel trios as they are.
2. The accent can change to suit the brand (keep the fill, deep and edge trio and use it the same way), but lime is the default.
3. Choose the layout fresh for the product. Reuse the component styles above, not the section list.
4. Generate a new hero image with the template, swapping only the style line, then fit it with the width-based height trick.
