import type { ReactNode } from 'react';
import Header from '../components/Header';
import { IconBarcode, IconDoc } from '../components/icons';

function OriginCard({ onClick, icon, title, desc }: { onClick: () => void; icon: ReactNode; title: string; desc: string }) {
  return (
    <div
      onClick={onClick}
      className="tap-soft"
      style={{
        flex: 1,
        borderRadius: 20,
        border: '1px solid var(--border)',
        background: 'var(--card)',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        minHeight: 0,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: 'var(--muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--foreground)',
        }}
      >
        {icon}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ font: '600 21px/1.15 var(--font-heading)', color: 'var(--foreground)' }}>{title}</div>
        <div style={{ font: '400 13px/1.4 var(--font-sans)', color: 'var(--muted-foreground)' }}>{desc}</div>
      </div>
    </div>
  );
}

export default function RoturaOrigen({
  onBack,
  onEan,
  onAlbaran,
}: {
  onBack: () => void;
  onEan: () => void;
  onAlbaran: () => void;
}) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Header onBack={onBack} title="Registrar rotura" titleSize={18} />
      <div
        style={{
          padding: '6px 16px 0',
          font: '400 13px/1.5 var(--font-sans)',
          color: 'var(--muted-foreground)',
          textWrap: 'pretty',
          flexShrink: 0,
        }}
      >
        ¿De dónde sale la rotura? Con el EAN o el albarán ya sabemos qué producto es y a quién se le imputa.
      </div>
      <div style={{ flex: 1, minHeight: 0, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <OriginCard
          onClick={onEan}
          icon={<IconBarcode />}
          title="Producto en balda"
          desc="Escanea el EAN. Rotura interna de almacén."
        />
        <OriginCard
          onClick={onAlbaran}
          icon={<IconDoc />}
          title="Albarán del conductor"
          desc="Foto del albarán. Se imputa al transportista."
        />
      </div>
    </div>
  );
}
