import Image, { type StaticImageData } from 'next/image'
import heroMeadow from '@/assets/images/hero-meadow.webp'
import { cn } from '@/utils/cn.util'

/**
 * Decorative landscape behind a hero or banner, fading into the page at the bottom. Defaults to the home meadow.
 * The parent sets the height; growing it with the viewport width keeps the hills level with the download button on every screen.
 */
export function HeroLandscape({ className, image = heroMeadow }: { className?: string; image?: StaticImageData }) {
  return (
    <div aria-hidden className={cn('pointer-events-none overflow-hidden', className)}>
      <Image
        src={image}
        alt=""
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="object-cover object-bottom"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-b from-transparent to-canvas" />
    </div>
  )
}
