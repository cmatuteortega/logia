import type { ReactNode } from 'react';
import UI from '../ds';
import AIInputBar from '../components/AIInputBar';
import { IconBell, IconCamera, IconChecklist, IconDoorArrow, IconRotura } from '../components/icons';

type Props = {
  notifCount: number;
  revisarCount: number;
  roturaCount: number;
  draft: string;
  onDraft: (v: string) => void;
  onSend: () => void;
  onMenu: () => void;
  onNotif: () => void;
  onRecepcionar: () => void;
  onRevisar: () => void;
  onRoturar: () => void;
};

const TILE = {
  width: 44,
  height: 44,
  borderRadius: 14,
  background: 'oklch(0 0 0 / .07)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'inherit',
  flexShrink: 0,
} as const;

const COUNTER = {
  width: 32,
  height: 32,
  borderRadius: 999,
  background: 'oklch(0 0 0 / .07)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  font: '600 16px/1 var(--font-heading)',
  letterSpacing: '-.01em',
  flexShrink: 0,
} as const;

const card = (grow: number) => ({
  flex: grow,
  borderRadius: 20,
  background: 'var(--card)',
  border: '1px solid var(--border)',
  color: 'var(--foreground)',
  padding: '15px 17px',
  display: 'flex',
  flexDirection: 'column' as const,
  justifyContent: 'space-between' as const,
  gap: 10,
  cursor: 'pointer',
  minHeight: 0,
});

function SecondaryCard({
  onClick,
  icon,
  count,
  countColor,
  countOpacity,
  title,
  desc,
}: {
  onClick: () => void;
  icon: ReactNode;
  count: number;
  countColor: string;
  countOpacity?: number;
  title: string;
  desc: string;
}) {
  return (
    <div onClick={onClick} className="tap-card" style={card(1)}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={TILE}>{icon}</div>
        <div style={{ ...COUNTER, color: countColor, opacity: countOpacity }}>{count}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ font: '600 23px/1 var(--font-heading)', letterSpacing: '-.01em', color: 'inherit' }}>{title}</div>
        <div style={{ font: '400 13px/1.3 var(--font-sans)', color: 'inherit', opacity: 0.68 }}>{desc}</div>
      </div>
    </div>
  );
}

export default function Landing(p: Props) {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '14px 16px 18px',
        boxSizing: 'border-box',
        gap: 14,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div onClick={p.onMenu} style={{ display: 'flex', alignItems: 'center', gap: 11, cursor: 'pointer' }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 13,
              border: '1px solid var(--border)',
              background: 'var(--card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: 'var(--foreground)',
            }}
          >
            <IconDoorArrow />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ font: '600 15px/1.1 var(--font-heading)', color: 'var(--foreground)' }}>Javi Moreno</div>
            <div style={{ font: '400 12px/1.1 var(--font-sans)', color: 'var(--muted-foreground)' }}>
              Muelle 3 · Alba Fresh
            </div>
          </div>
        </div>
        <div
          onClick={p.onNotif}
          className="tap"
          style={{
            position: 'relative',
            width: 48,
            height: 48,
            borderRadius: 14,
            border: '1px solid var(--border)',
            background: 'var(--card)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--foreground)',
          }}
        >
          <IconBell />
          <div style={{ position: 'absolute', top: -6, right: -6 }}>
            <UI.Badge variant="destructive">{p.notifCount}</UI.Badge>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, minHeight: 0 }}>
        <div onClick={p.onRecepcionar} className="tap-card" style={card(1.2)}>
          <div style={TILE}>
            <IconCamera />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ font: '600 26px/1 var(--font-heading)', letterSpacing: '-.01em' }}>Recepcionar</div>
            <div style={{ font: '400 13px/1.3 var(--font-sans)', opacity: 0.85 }}>
              Foto del albarán y la IA saca las líneas a escanear.
            </div>
          </div>
        </div>

        <SecondaryCard
          onClick={p.onRevisar}
          icon={<IconChecklist />}
          count={p.revisarCount}
          countColor="var(--destructive)"
          title="Revisar"
          desc="Cantidades y caducidades pendientes."
        />

        <SecondaryCard
          onClick={p.onRoturar}
          icon={<IconRotura />}
          count={p.roturaCount}
          countColor="inherit"
          countOpacity={0.6}
          title="Roturar"
          desc="Producto en balda o albarán del conductor."
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
        <AIInputBar value={p.draft} onChange={p.onDraft} onSend={p.onSend} leadingIcon />
      </div>
    </div>
  );
}
