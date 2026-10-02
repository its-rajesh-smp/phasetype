export const OG_SIZE = { width: 1200, height: 630 }

export const OG_ALT = 'PhaseType: better words, right where you type. AI writing for every app on your Mac.'

/** Fonts for the share image. Satori needs woff or ttf, so these come from the fontsource packages. */
export const OG_FONT_FILES = [
  { name: 'Instrument Serif', style: 'normal', weight: 400, path: '@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff' },
  { name: 'Instrument Serif', style: 'italic', weight: 400, path: '@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff' },
  { name: 'Inter', style: 'normal', weight: 600, path: '@fontsource/inter/files/inter-latin-600-normal.woff' }
] as const
