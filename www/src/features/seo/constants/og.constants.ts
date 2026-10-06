export const OG_SIZE = { width: 1200, height: 630 }

export const OG_ALT = 'PhaseType: better words, right where you type. AI writing for every app on your Mac.'

/** Fonts for the share image. Satori needs woff or ttf, so these come from the fontsource package. */
export const OG_FONT_FILES = [
  { name: 'Inter', style: 'normal', weight: 400, path: '@fontsource/inter/files/inter-latin-400-normal.woff' },
  { name: 'Inter', style: 'normal', weight: 600, path: '@fontsource/inter/files/inter-latin-600-normal.woff' }
] as const
