import type { ReactNode } from 'react';
import UI from '../ds';
import Header from '../components/Header';
import { IconBox, IconTimer } from '../components/icons';

function ReviewCard({
  onClick,
  icon,
  badge,
  badgeVariant,
  title,
  desc,
}: {
  onClick: () => void;
  icon: ReactNode;
  badge: string;
  badgeVariant: 'destructive' | 'secondary';
  title: string;
  desc: string;
}) {
  return (
    <div
      onClick={onClick}
      className="tap-card"
      style={{
        flex: 1,
        borderRadius: 20,
        border: '1px solid var(--border)',
        background: 'var(--card)',
        color: 'var(--foreground)',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        minHeight: 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: 'oklch(0 0 0 / .07)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'inherit',
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <UI.Badge variant={badgeVariant}>{badge}</UI.Badge>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ font: '600 22px/1.1 var(--font-heading)', color: 'inherit' }}>{title}</div>
        <div style={{ font: '400 13px/1.4 var(--font-sans)', color: 'inherit', opacity: 0.68 }}>{desc}</div>
      </div>
    </div>
  );
}

export default function Revisar({
  onBack,
  onCantidades,
  onCaducidades,
}: {
  onBack: () => void;
  onCantidades: () => void;
  onCaducidades: () => void;
}) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Header onBack={onBack} title="Revisar" titleSize={18} />
      <div
        style={{
          padding: '6px 16px 0',
          font: '400 13px/1.5 var(--font-sans)',
          color: 'var(--muted-foreground)',
          textWrap: 'pretty',
          flexShrink: 0,
        }}
      >
        ¿Qué quieres repasar? Las dos colas salen de lo escaneado hoy en este muelle.
      </div>
      <div style={{ flex: 1, minHeight: 0, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <ReviewCard
          onClick={onCantidades}
          icon={<IconBox />}
          badge="2 sin revisar"
          badgeVariant="destructive"
          title="Cantidades"
          desc="Diferencias entre el albarán y lo contado."
        />
        <ReviewCard
          onClick={onCaducidades}
          icon={<IconTimer />}
          badge="3 próximas"
          badgeVariant="secondary"
          title="Caducidades"
          desc="Lotes cortos leídos de las etiquetas."
        />
      </div>
    </div>
  );
}
