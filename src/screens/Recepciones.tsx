import UI from '../ds';
import Header from '../components/Header';
import { IconCameraSmall } from '../components/icons';
import { RECEPCIONES_ESPERADAS, RECEPCIONES_HOY } from '../data/fixtures';

type Props = {
  tab: string;
  onTab: (v: string) => void;
  onBack: () => void;
  onScan: () => void;
};

export default function Recepciones({ tab, onTab, onBack, onScan }: Props) {
  const items = tab === 'esp' ? RECEPCIONES_ESPERADAS : RECEPCIONES_HOY;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--background)' }}>
      <Header
        onBack={onBack}
        ghostBack
        titleSize={17}
        title="Recepciones"
        sub="Lo de hoy y lo que se espera en este muelle"
      />
      <UI.Separator />
      <div
        className="no-shrink"
        style={{
          flex: 1,
          minHeight: 0,
          overflow: 'auto',
          padding: '12px 16px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex' }}>
          <UI.Tabs value={tab} onValueChange={onTab}>
            <UI.TabsList>
              <UI.TabsTrigger value="hoy">Hoy · 7</UI.TabsTrigger>
              <UI.TabsTrigger value="esp">Esperadas · 4</UI.TabsTrigger>
            </UI.TabsList>
          </UI.Tabs>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((it) => (
            <UI.Item key={it.title + it.time} variant="outline">
              <UI.ItemMedia>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: it.iconBg,
                    color: it.iconFg,
                    font: '600 13px var(--font-mono)',
                  }}
                >
                  {it.initials}
                </div>
              </UI.ItemMedia>
              <UI.ItemContent>
                <UI.ItemTitle>{it.title}</UI.ItemTitle>
                <UI.ItemDescription>{it.sub}</UI.ItemDescription>
              </UI.ItemContent>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                <UI.Badge variant={it.badgeVariant}>{it.tag}</UI.Badge>
                <div style={{ font: '400 11px var(--font-mono)', color: 'var(--muted-foreground)' }}>{it.time}</div>
              </div>
            </UI.Item>
          ))}
        </div>
      </div>
      <div style={{ padding: '10px 16px 16px', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
        <div
          onClick={onScan}
          className="tap-soft"
          style={{
            height: 52,
            borderRadius: 16,
            background: 'var(--primary)',
            color: 'var(--primary-foreground)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 9,
            font: '600 14.5px var(--font-sans)',
            cursor: 'pointer',
          }}
        >
          <IconCameraSmall />
          Escanear un albarán
        </div>
      </div>
    </div>
  );
}
