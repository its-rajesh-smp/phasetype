import Image from 'next/image'
import privacySky from '@/assets/images/privacy-sky.webp'

/** Painted sky behind the Privacy card, washed lighter on the left so the heading stays readable. */
export function PrivacyBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <Image
        src={privacySky}
        alt=""
        fill
        placeholder="blur"
        sizes="(min-width: 1152px) 1152px, 100vw"
        className="object-cover object-bottom saturate-[0.9]"
      />
      <div className="absolute inset-0 bg-linear-to-r from-white/55 via-white/15 to-transparent" />
    </div>
  )
}
