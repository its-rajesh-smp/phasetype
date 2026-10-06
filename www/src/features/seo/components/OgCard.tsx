import { SITE } from '@/constants/site.constants'

/* Satori (the OG image renderer) only understands inline style objects, so this file can't use Tailwind classes. */

/** The 1200×630 social share card: soft sky, icon, headline with a lime highlight. */
export function OgCard({ iconSrc }: { iconSrc: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px 72px',
        backgroundColor: '#fafafa',
        backgroundImage: 'linear-gradient(180deg, #a9d3f2 0%, #dcedf9 45%, #fafafa 100%)',
        color: '#0a0a0a',
        fontFamily: 'Inter'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={iconSrc} width={72} height={72} alt="" style={{ margin: -8 }} />
        <span style={{ fontWeight: 600, fontSize: 34, letterSpacing: '-0.02em' }}>{SITE.name}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', fontSize: 92, fontWeight: 400, lineHeight: 1.02, letterSpacing: '-0.04em' }}>
        <span>Better words,</span>
        <span style={{ display: 'flex' }}>
          <span style={{ backgroundColor: '#bef264', borderRadius: 16, padding: '0 14px', marginLeft: -14 }}>right where</span>
          <span style={{ marginLeft: 24 }}>you type.</span>
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: 24, color: '#525252' }}>
        <span>AI writing for every app on your Mac</span>
        <span>{SITE.domain}</span>
      </div>
    </div>
  )
}
