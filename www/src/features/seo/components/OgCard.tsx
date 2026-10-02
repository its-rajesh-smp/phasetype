import { SITE } from '@/constants/site.constants'

/* Satori (the OG image renderer) only understands inline style objects, so this file can't use Tailwind classes. */

/** The 1200×630 social share card: paper background, icon, serif headline with the marker. */
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
        backgroundColor: '#f4eee2',
        backgroundImage:
          'radial-gradient(circle at 88% 0%, rgba(227,245,66,0.55), rgba(227,245,66,0) 45%), radial-gradient(circle at 0% 100%, rgba(232,168,112,0.3), rgba(232,168,112,0) 40%)',
        color: '#16130f'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={iconSrc} width={72} height={72} alt="" style={{ margin: -8 }} />
        <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 34, letterSpacing: '-0.02em' }}>{SITE.name}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'Instrument Serif', fontSize: 104, lineHeight: 0.95 }}>
        <span>Better words,</span>
        <span style={{ display: 'flex' }}>
          <span style={{ position: 'relative', display: 'flex', fontStyle: 'italic', padding: '0 8px' }}>
            <span
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 6,
                height: 38,
                backgroundImage: 'linear-gradient(90deg, #e3f542 0%, #d3e72b 45%, #cf7428 100%)'
              }}
            />
            <span style={{ position: 'relative' }}>right where</span>
          </span>
          <span style={{ marginLeft: 24 }}>you type.</span>
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter', fontWeight: 600, fontSize: 24, color: '#6e675b' }}>
        <span>AI writing for every app on your Mac</span>
        <span>{SITE.domain}</span>
      </div>
    </div>
  )
}
