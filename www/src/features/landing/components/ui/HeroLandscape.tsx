import Image from 'next/image'
import heroMeadow from '@/assets/images/hero-meadow.webp'
import { cn } from '@/utils/cn.util'

/**
 * Decorative misty meadow behind the hero, fading into the page at the bottom.
 * The parent sets the height; growing it with the viewport width keeps the hills level with the download button on every screen.
 */
export function HeroLandscape({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('pointer-events-none overflow-hidden', className)}>
      <Image
        src={heroMeadow}
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
