import { HeaderNav } from './HeaderNav'

/** Sticky header holding the floating pill nav. */
export function SiteHeader() {
  return (
    <header className="sticky top-3 z-50 mt-4 px-4 sm:top-4">
      <HeaderNav />
    </header>
  )
}
