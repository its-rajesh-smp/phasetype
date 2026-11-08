import 'server-only'

/** The visitor's IP from the proxy headers, or a shared bucket when there is none (e.g. local dev). */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return forwarded || request.headers.get('x-real-ip')?.trim() || 'unknown'
}

/** False when a browser sends the request from another site, so other pages can't spend the free tries. */
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin')
  if (!origin) return true
  try {
    return new URL(origin).host === (request.headers.get('x-forwarded-host') ?? request.headers.get('host'))
  } catch {
    return false
  }
}
