const btn = (size: number, radius: number, font: number) => ({
  width: size,
  height: size,
  borderRadius: radius,
  background: 'var(--secondary)',
  color: 'var(--secondary-foreground)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  font: `400 ${font}px/1 var(--font-sans)`,
  cursor: 'pointer',
  flexShrink: 0,
});

type RowProps = {
  label: string;
  hint: string;
  value: number;
  onDec: () => void;
  onInc: () => void;
  borderColor?: string;
};

export function StepperRow({ label, hint, value, onDec, onInc, borderColor = 'var(--border)' }: RowProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: 12,
        border: `1px solid ${borderColor}`,
        borderRadius: 16,
        background: 'var(--card)',
      }}
    >
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ font: '600 15px/1.1 var(--font-sans)', color: 'var(--foreground)' }}>{label}</div>
        <div style={{ font: '400 11.5px/1.1 var(--font-sans)', color: 'var(--muted-foreground)' }}>{hint}</div>
      </div>
      <div onClick={onDec} className="tap" style={btn(56, 16, 28)}>
        −
      </div>
      <div style={{ minWidth: 48, textAlign: 'center', font: '600 26px/1 var(--font-mono)', color: 'var(--foreground)' }}>
        {value}
      </div>
      <div onClick={onInc} className="tap" style={btn(56, 16, 28)}>
        +
      </div>
    </div>
  );
}

export function StepperLarge({ value, onDec, onInc }: { value: number; onDec: () => void; onInc: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22 }}>
      <div onClick={onDec} className="tap" style={btn(64, 20, 32)}>
        −
      </div>
      <div style={{ minWidth: 56, textAlign: 'center', font: '600 34px/1 var(--font-mono)', color: 'var(--foreground)' }}>
        {value}
      </div>
      <div onClick={onInc} className="tap" style={btn(64, 20, 32)}>
        +
      </div>
    </div>
  );
}
