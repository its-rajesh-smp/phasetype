import { Marker } from '@/components/ui/Marker'

/** The playground's headline and one-line instructions. Holds the page's only h1. */
export function TryHero() {
  return (
    <div className="mx-auto flex max-w-3xl animate-rise flex-col items-center gap-6 text-center">
      <h1 className="text-[40px] leading-[1.02] font-normal tracking-[-0.035em] text-balance text-ink sm:text-6xl">
        Try PhaseType <Marker>right here</Marker>.
      </h1>
      <p className="max-w-2xl text-lg leading-relaxed text-pretty text-ink/75 sm:text-xl">
        Pick a draft, tap an action, and watch PhaseType rewrite it.
      </p>
    </div>
  )
}
