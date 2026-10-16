import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';

export const alt = 'Mayur Sonawane — Mobile App Developer';
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
          justifyContent: 'space-between',
          backgroundColor: '#020404',
          padding: '80px',
          color: '#F7F7E5',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Subtle decorative glow */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '600px',
            height: '600px',
            borderRadius: '100%',
            backgroundColor: '#79876E',
            opacity: 0.15,
            filter: 'blur(120px)',
          }}
        />

        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#79876E',
            }}
          />
          <span
            style={{
              fontSize: 20,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#79909C',
              fontWeight: 600,
            }}
          >
            Flutter Developer · Mobile Apps
          </span>
        </div>

        {/* Main headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h1
            style={{
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              margin: 0,
              color: '#F7F7E5',
            }}
          >
            Mayur Sonawane
          </h1>
          <p
            style={{
              fontSize: 32,
              fontWeight: 400,
              color: '#6B796F',
              margin: 0,
              maxWidth: '900px',
              lineHeight: 1.3,
            }}
          >
            {siteConfig.description}
          </p>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(107, 121, 111, 0.3)',
            paddingTop: '32px',
          }}
        >
          <span style={{ fontSize: 22, color: '#79876E', fontWeight: 600 }}>
            {siteConfig.url.replace('https://', '')}
          </span>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span style={{ fontSize: 20, color: '#F7F7E5', opacity: 0.6 }}>
              AI Expense Scanner
            </span>
            <span style={{ fontSize: 20, color: '#F7F7E5', opacity: 0.3 }}>·</span>
            <span style={{ fontSize: 20, color: '#F7F7E5', opacity: 0.6 }}>
              StayEase
            </span>
            <span style={{ fontSize: 20, color: '#F7F7E5', opacity: 0.3 }}>·</span>
            <span style={{ fontSize: 20, color: '#F7F7E5', opacity: 0.6 }}>
              Smart Water Reminder
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
