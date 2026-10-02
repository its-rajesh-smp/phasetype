import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { OgCard } from '../components/OgCard'
import { OG_FONT_FILES, OG_SIZE } from '../constants/og.constants'

/** Renders the social share card. Shared by the Open Graph and Twitter image routes. */
export async function renderOgImage(): Promise<ImageResponse> {
  const fonts = await Promise.all(
    OG_FONT_FILES.map(async (font) => ({
      name: font.name,
      style: font.style,
      weight: font.weight,
      data: await readFile(join(process.cwd(), 'node_modules', font.path))
    }))
  )
  const icon = await readFile(join(process.cwd(), 'public', 'icon.png'), 'base64')

  return new ImageResponse(<OgCard iconSrc={`data:image/png;base64,${icon}`} />, { ...OG_SIZE, fonts })
}
