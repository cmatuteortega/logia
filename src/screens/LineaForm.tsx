import UI from '../ds';
import Header from '../components/Header';
import { StepperLarge, StepperRow } from '../components/Stepper';
import { IconFlag, IconWarning } from '../components/icons';
import { cajasN, type LineaEstado } from '../data/fixtures';
import type { Albaran } from '../services/reception';

const SECTION_LABEL = {
  font: '600 12px/1 var(--font-sans)',
  letterSpacing: '.04em',
  textTransform: 'uppercase' as const,
  color: 'var(--muted-foreground)',
};

type Props = {
  albaran: Albaran;
  linea: LineaEstado;
  index: number;
  total: number;
  palets: number;
  flagged: boolean;
  labelPhoto: string | null;
  onBack: () => void;
  onToggleFlag: () => void;
  onCajas: (d: number) => void;
  onPalets: (d: number) => void;
  onRotura: () => void;
  onSave: () => void;
};

export default function LineaForm(p: Props) {
  const { linea } = p;
  const diff = linea.real - linea.esperado;

  const diffTitle =
    diff < 0
      ? diff === -1
        ? 'Falta 1 caja frente al albarán'
        : `Faltan ${cajasN(-diff)} frente al albarán`
      : diff === 1
        ? 'Sobra 1 caja frente al albarán'
        : `Sobran ${cajasN(diff)} frente al albarán`;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Header
        onBack={p.onBack}
        title={`Línea ${p.index + 1} de ${p.total}`}
        titleSize={15.5}
        sub={`${p.albaran.numero} · ${p.albaran.proveedorCorto}`}
        right={
          <div
            onClick={p.onToggleFlag}
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              color: p.flagged ? 'var(--destructive)' : 'var(--muted-foreground)',
            }}
          >
            <IconFlag />
          </div>
        }
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
          gap: 18,
        }}
      >
        <UI.Card>
          <UI.CardHeader>
            <UI.CardTitle>Leído de la etiqueta</UI.CardTitle>
            <UI.CardDescription>EAN y caducidad guardados en la ficha del producto</UI.CardDescription>
          </UI.CardHeader>
          <UI.CardContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    flexShrink: 0,
                    borderRadius: 12,
                    overflow: 'hidden',
                    background: 'var(--muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    font: '500 9.5px/1.3 var(--font-mono)',
                    color: 'var(--muted-foreground)',
                    textAlign: 'center',
                  }}
                >
                  {p.labelPhoto ? (
                    <img src={p.labelPhoto} alt="Etiqueta" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <>
                      FOTO
                      <br />
                      ETIQUETA
                    </>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ font: '600 17px/1.2 var(--font-heading)', color: 'var(--foreground)', textWrap: 'pretty' }}>
                    {linea.name}
                  </div>
                  <div style={{ font: '400 12.5px/1.35 var(--font-sans)', color: 'var(--muted-foreground)' }}>
                    EAN {linea.ean}
                  </div>
                  <div style={{ font: '400 12.5px/1.35 var(--font-sans)', color: 'var(--muted-foreground)' }}>
                    Lote {linea.lote}
                  </div>
                </div>
              </div>
              <UI.Separator />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
                {[
                  ['Esperado', `${linea.esperado} cajas`],
                  ['Uds/caja', String(linea.udsCaja)],
                  ['Caducidad', linea.cad],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <div style={{ font: '500 11px/1 var(--font-sans)', color: 'var(--muted-foreground)' }}>{k}</div>
                    <div style={{ font: '600 15px/1 var(--font-mono)', color: 'var(--foreground)' }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </UI.CardContent>
        </UI.Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={SECTION_LABEL}>Cantidad real recibida</div>
          <StepperRow
            label="Cajas"
            hint={`albarán: ${linea.esperado}`}
            value={linea.real}
            onDec={() => p.onCajas(-1)}
            onInc={() => p.onCajas(1)}
            borderColor={diff === 0 ? 'var(--border)' : 'oklch(0.577 0.245 27.325 / .5)'}
          />
          <StepperRow
            label="Unidades"
            hint={`calculado: ${linea.real} × ${linea.udsCaja}`}
            value={linea.real * linea.udsCaja}
            onDec={() => p.onCajas(-1)}
            onInc={() => p.onCajas(1)}
          />
        </div>

        {diff !== 0 && (
          <UI.Alert variant="destructive">
            <IconWarning />
            <UI.AlertTitle>{diffTitle}</UI.AlertTitle>
            <UI.AlertDescription>
              Al guardar se abre incidencia con la foto de la etiqueta. Si viene dañado, regístralo como rotura.
            </UI.AlertDescription>
          </UI.Alert>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={SECTION_LABEL}>Palets del albarán</div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 14,
              padding: '16px 12px',
              border: '1px solid var(--border)',
              borderRadius: 16,
              background: 'var(--card)',
            }}
          >
            <div style={{ font: '400 12.5px/1.3 var(--font-sans)', color: 'var(--muted-foreground)', textAlign: 'center' }}>
              Se registra una vez por albarán
            </div>
            <StepperLarge value={p.palets} onDec={() => p.onPalets(-1)} onInc={() => p.onPalets(1)} />
          </div>
        </div>
      </div>

      <UI.Separator />
      <div style={{ display: 'flex', gap: 10, padding: '12px 16px 16px', background: 'var(--card)', flexShrink: 0 }}>
        <div
          onClick={p.onRotura}
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
          onClick={p.onSave}
          className="tap-soft"
          style={{
            flex: 1,
            height: 56,
            borderRadius: 16,
            background: 'var(--primary)',
            color: 'var(--primary-foreground)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            font: '600 15.5px var(--font-sans)',
            cursor: 'pointer',
          }}
        >
          {diff === 0 ? 'Guardar línea' : 'Guardar con incidencia'}
        </div>
      </div>
    </div>
  );
}
