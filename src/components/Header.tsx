import type { ReactNode } from 'react';
import { IconBack } from './icons';

type Props = {
  onBack: () => void;
  title: ReactNode;
  sub?: ReactNode;
  titleSize?: number;
  right?: ReactNode;
  ghostBack?: boolean;
};

export default function Header({ onBack, title, sub, titleSize = 16, right, ghostBack }: Props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 10px', flexShrink: 0 }}>
      <div
        onClick={onBack}
        className={ghostBack ? 'tap-ghost' : undefined}
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--foreground)',
          flexShrink: 0,
        }}
      >
        <IconBack />
      </div>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ font: `600 ${titleSize}px/1.1 var(--font-heading)`, color: 'var(--foreground)' }}>{title}</div>
        {sub && (
          <div style={{ font: '400 11.5px/1.1 var(--font-sans)', color: 'var(--muted-foreground)' }}>{sub}</div>
        )}
      </div>
      {right}
    </div>
  );
}
