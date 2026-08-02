import type { ReactNode } from 'react';

const MD = {
  surface: '#f4fbf8',
  onSurface: '#171d1b',
  frameBorder: 'rgba(116,119,117,0.5)',
};

function StatusBar({ dark }: { dark: boolean }) {
  const c = dark ? '#fff' : MD.onSurface;
  return (
    <div
      style={{
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        position: 'relative',
        flexShrink: 0,
        fontFamily: 'Roboto, system-ui, sans-serif',
      }}
    >
      <div style={{ width: 128, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 400, letterSpacing: 0.25, lineHeight: '20px', color: c }}>9:30</span>
      </div>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 8,
          transform: 'translateX(-50%)',
          width: 24,
          height: 24,
          borderRadius: 100,
          background: '#2e2e2e',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', paddingRight: 2 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginRight: -2 }}>
            <path d="M8 13.3L.67 5.97a10.37 10.37 0 0114.66 0L8 13.3z" fill={c} />
          </svg>
          <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginRight: -2 }}>
            <path d="M14.67 14.67V1.33L1.33 14.67h13.34z" fill={c} />
          </svg>
        </div>
        <svg width="16" height="16" viewBox="0 0 16 16">
          <rect x="3.75" y="2" width="8.5" height="13" rx="1.5" fill={c} />
          <rect x="5.5" y="0.9" width="5" height="2" rx="0.5" fill={c} />
        </svg>
      </div>
    </div>
  );
}

function NavBar({ dark }: { dark: boolean }) {
  return (
    <div style={{ height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <div style={{ width: 108, height: 4, borderRadius: 2, background: dark ? '#fff' : MD.onSurface, opacity: 0.4 }} />
    </div>
  );
}

/**
 * On a phone the frame fills the viewport and the bezel is dropped; on a desktop
 * canvas it renders as the 412x892 device the prototype was designed in.
 */
export default function AndroidDevice({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  const framed = typeof window !== 'undefined' && window.matchMedia('(min-width: 520px)').matches;
  return (
    <div
      data-om-starter="android-frame"
      style={{
        width: framed ? 412 : '100vw',
        height: framed ? 892 : '100dvh',
        borderRadius: framed ? 18 : 0,
        overflow: 'hidden',
        background: dark ? '#1d1b20' : MD.surface,
        border: framed ? `8px solid ${MD.frameBorder}` : 'none',
        boxShadow: framed ? '0 30px 80px rgba(0,0,0,0.25)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}
    >
      <StatusBar dark={dark} />
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>{children}</div>
      <NavBar dark={dark} />
    </div>
  );
}
