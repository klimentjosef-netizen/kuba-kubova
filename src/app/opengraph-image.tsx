import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Kuba&Kubová studio — Architektonické studio Ostrava';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0f0f0d',
          padding: '80px',
        }}
      >
        {/* Thin border frame */}
        <div
          style={{
            position: 'absolute',
            top: '24px',
            left: '24px',
            right: '24px',
            bottom: '24px',
            border: '0.5px solid rgba(139, 111, 71, 0.3)',
            display: 'flex',
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '4px',
            marginBottom: '32px',
          }}
        >
          <span
            style={{
              fontSize: '64px',
              fontWeight: 400,
              color: '#f0ede6',
              fontFamily: 'Georgia, serif',
            }}
          >
            Kuba
          </span>
          <span
            style={{
              fontSize: '48px',
              fontWeight: 400,
              color: '#8b6f47',
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              margin: '0 4px',
            }}
          >
            &
          </span>
          <span
            style={{
              fontSize: '64px',
              fontWeight: 400,
              color: '#f0ede6',
              fontFamily: 'Georgia, serif',
            }}
          >
            Kubová
          </span>
          <span
            style={{
              fontSize: '18px',
              fontWeight: 400,
              color: '#6b6456',
              letterSpacing: '0.2em',
              textTransform: 'uppercase' as const,
              marginLeft: '16px',
            }}
          >
            studio
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '24px',
            fontWeight: 300,
            color: '#c8b89a',
            letterSpacing: '0.15em',
            textTransform: 'uppercase' as const,
            marginBottom: '48px',
          }}
        >
          Architektonické studio Ostrava
        </div>

        {/* Decorative line */}
        <div
          style={{
            width: '120px',
            height: '1px',
            backgroundColor: '#8b6f47',
            marginBottom: '48px',
          }}
        />

        {/* Claim */}
        <div
          style={{
            fontSize: '36px',
            fontWeight: 400,
            color: '#f0ede6',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
          }}
        >
          Stavby, které obstojí v čase.
        </div>
      </div>
    ),
    { ...size },
  );
}
