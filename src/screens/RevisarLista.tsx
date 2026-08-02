import UI from '../ds';
import Header from '../components/Header';
import { REV_CADUCIDADES, REV_CANTIDADES } from '../data/fixtures';

export type RevKind = 'cant' | 'cad';

export default function RevisarLista({ kind, onBack }: { kind: RevKind; onBack: () => void }) {
  const items = kind === 'cad' ? REV_CADUCIDADES : REV_CANTIDADES;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Header
        onBack={onBack}
        ghostBack
        titleSize={17}
        title={kind === 'cad' ? 'Caducidades' : 'Cantidades'}
        sub={kind === 'cad' ? 'Lotes cortos · leído de etiqueta' : 'Diferencias frente al albarán'}
      />
      <UI.Separator />
      <div
        className="no-shrink"
        style={{
          flex: 1,
          minHeight: 0,
          overflow: 'auto',
          padding: '14px 16px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {items.map((r) => (
          <UI.Item key={r.title} variant="outline">
            <UI.ItemMedia>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: r.iconBg,
                  color: r.iconFg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  font: '600 12.5px var(--font-mono)',
                }}
              >
                {r.mark}
              </div>
            </UI.ItemMedia>
            <UI.ItemContent>
              <UI.ItemTitle>{r.title}</UI.ItemTitle>
              <UI.ItemDescription>{r.sub}</UI.ItemDescription>
            </UI.ItemContent>
            <UI.Badge variant={r.badgeVariant}>{r.tag}</UI.Badge>
          </UI.Item>
        ))}
      </div>
    </div>
  );
}
