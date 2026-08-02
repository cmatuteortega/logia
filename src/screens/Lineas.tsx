import UI from '../ds';
import Header from '../components/Header';
import { IconFlag } from '../components/icons';
import type { Albaran } from '../services/reception';
import type { LineaEstado } from '../data/fixtures';

type Props = {
  albaran: Albaran;
  lineas: LineaEstado[];
  flagged: boolean;
  onBack: () => void;
  onToggleFlag: () => void;
  onScan: (index: number) => void;
  onRotura: () => void;
  onClose: () => void;
};

export default function Lineas({ albaran, lineas, flagged, onBack, onToggleFlag, onScan, onRotura, onClose }: Props) {
  const done = lineas.filter((l) => l.done).length;
  const total = lineas.length;
  const pend = total - done;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Header
        onBack={onBack}
        title={albaran.numero}
        sub={`${albaran.proveedor} · ${albaran.fecha} · ${albaran.palets}`}
        right={
          <div
            onClick={onToggleFlag}
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              color: flagged ? 'var(--destructive)' : 'var(--muted-foreground)',
            }}
          >
            <IconFlag />
          </div>
        }
      />
      <UI.Separator />

      <div style={{ padding: '14px 16px 10px', display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div
            style={{
              font: '600 12px/1 var(--font-sans)',
              letterSpacing: '.04em',
              textTransform: 'uppercase',
              color: 'var(--muted-foreground)',
            }}
          >
            Líneas leídas por la IA
          </div>
          <div style={{ font: '500 12px/1 var(--font-mono)', color: 'var(--muted-foreground)' }}>
            {done} de {total} escaneadas
          </div>
        </div>
        <UI.Progress value={Math.round((done / total) * 100)} />
      </div>

      <div
        className="no-shrink"
        style={{
          flex: 1,
          minHeight: 0,
          overflow: 'auto',
          padding: '0 16px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {lineas.map((l, i) => {
          const exact = l.real === l.esperado;
          return (
            <div key={i} onClick={() => onScan(i)} style={{ cursor: 'pointer' }}>
              <UI.Item variant="outline">
                <UI.ItemMedia>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: l.done
                        ? exact
                          ? 'oklch(0.696 0.17 162.48 / .18)'
                          : 'oklch(0.577 0.245 27.325 / .12)'
                        : 'var(--muted)',
                      color: l.done ? (exact ? 'var(--chart-5)' : 'var(--destructive)') : 'var(--muted-foreground)',
                      font: '600 13px var(--font-mono)',
                    }}
                  >
                    {l.done ? '✓' : String(i + 1)}
                  </div>
                </UI.ItemMedia>
                <UI.ItemContent>
                  <UI.ItemTitle>{l.name}</UI.ItemTitle>
                  <UI.ItemDescription>
                    {l.done
                      ? `${l.real} de ${l.esperado} ${l.unidad} · cad. ${l.cad}`
                      : `${l.esperado} ${l.unidad} previstas`}
                  </UI.ItemDescription>
                </UI.ItemContent>
                <UI.Badge variant={l.done ? (exact ? 'secondary' : 'destructive') : 'outline'}>
                  {l.done ? (exact ? 'ok' : 'incidencia') : 'escanear'}
                </UI.Badge>
              </UI.Item>
            </div>
          );
        })}
      </div>

      <UI.Separator />
      <div style={{ padding: '12px 16px 16px', display: 'flex', gap: 10, background: 'var(--card)', flexShrink: 0 }}>
        <div
          onClick={onRotura}
          className="tap-wide"
          style={{
            height: 56,
            padding: '0 20px',
            borderRadius: 16,
            border: '1px solid oklch(0.577 0.245 27.325 / .4)',
            color: 'var(--destructive)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            font: '600 14.5px var(--font-sans)',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          Rotura
        </div>
        <div
          onClick={onClose}
          className="tap-soft"
          style={{
            flex: 1,
            height: 56,
            borderRadius: 16,
            background: pend === 0 ? 'var(--primary)' : 'var(--secondary)',
            color: pend === 0 ? 'var(--primary-foreground)' : 'var(--secondary-foreground)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            font: '600 15.5px var(--font-sans)',
            cursor: 'pointer',
          }}
        >
          {pend === 0 ? 'Cerrar recepción' : `Cerrar (${pend} sin escanear)`}
        </div>
      </div>
    </div>
  );
}
