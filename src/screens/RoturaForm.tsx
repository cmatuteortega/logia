import { useState } from 'react';
import UI from '../ds';
import Header from '../components/Header';
import { StepperRow } from '../components/Stepper';
import { IconCheck, IconChevronDown } from '../components/icons';
import { MOTIVOS } from '../data/fixtures';

export type RoturaOrigenTipo = 'balda' | 'conductor' | 'descarga';

const SECTION_LABEL = {
  font: '600 12px/1 var(--font-sans)',
  letterSpacing: '.04em',
  textTransform: 'uppercase' as const,
  color: 'var(--muted-foreground)',
};

type Props = {
  origen: RoturaOrigenTipo;
  producto: string;
  productoSub: string;
  thumb: string;
  photo: string | null;
  motivo: string;
  onMotivo: (m: string) => void;
  cajas: number;
  onCajas: (d: number) => void;
  observaciones: string;
  onObservaciones: (v: string) => void;
  onBack: () => void;
  onSave: () => void;
};

const IMPUTA: Record<RoturaOrigenTipo, string> = {
  conductor: 'Imputa: transportista',
  balda: 'Imputa: almacén',
  descarga: 'Imputa: proveedor',
};

const ORIGEN_LABEL: Record<RoturaOrigenTipo, string> = {
  balda: 'Producto en balda',
  conductor: 'Albarán del conductor',
  descarga: 'Durante la descarga',
};

export default function RoturaForm(p: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Header onBack={p.onBack} title="Rotura" sub={ORIGEN_LABEL[p.origen]} />
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
        <UI.Item variant="outline">
          <UI.ItemMedia>
            <div
              style={{
                width: 56,
                height: 56,
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
              {p.photo ? (
                <img src={p.photo} alt="Evidencia" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                p.thumb
              )}
            </div>
          </UI.ItemMedia>
          <UI.ItemContent>
            <UI.ItemTitle>{p.producto}</UI.ItemTitle>
            <UI.ItemDescription>{p.productoSub}</UI.ItemDescription>
          </UI.ItemContent>
          <UI.Badge variant="outline">{IMPUTA[p.origen]}</UI.Badge>
        </UI.Item>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={SECTION_LABEL}>Motivo</div>
          <div style={{ position: 'relative' }}>
            <div
              onClick={() => setOpen(!open)}
              style={{
                height: 56,
                padding: '0 16px',
                borderRadius: 16,
                border: '1px solid var(--border)',
                background: 'var(--card)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                cursor: 'pointer',
                font: '600 15px var(--font-sans)',
                color: 'var(--foreground)',
              }}
            >
              {p.motivo}
              <div style={{ color: 'var(--muted-foreground)', flexShrink: 0, display: 'flex' }}>
                <IconChevronDown />
              </div>
            </div>
            {open && (
              <div
                style={{
                  position: 'absolute',
                  top: 60,
                  left: 0,
                  right: 0,
                  zIndex: 20,
                  borderRadius: 16,
                  border: '1px solid var(--border)',
                  background: 'var(--popover)',
                  boxShadow: '0 18px 40px oklch(0 0 0 / .18)',
                  overflow: 'hidden',
                }}
              >
                {MOTIVOS.map((m) => {
                  const sel = m === p.motivo;
                  return (
                    <div
                      key={m}
                      onClick={() => {
                        p.onMotivo(m);
                        setOpen(false);
                      }}
                      className="row-hover"
                      style={{
                        height: 52,
                        padding: '0 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 12,
                        cursor: 'pointer',
                        font: `${sel ? 600 : 500} 14.5px var(--font-sans)`,
                        color: 'var(--popover-foreground)',
                        background: sel ? 'var(--accent)' : 'transparent',
                      }}
                    >
                      {m}
                      {sel && <IconCheck />}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={SECTION_LABEL}>Cantidad afectada</div>
          <StepperRow
            label="Cajas roturadas"
            hint="salen del stock recibido"
            value={p.cajas}
            onDec={() => p.onCajas(-1)}
            onInc={() => p.onCajas(1)}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={SECTION_LABEL}>Evidencia</div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div
              style={{
                width: 78,
                height: 78,
                flexShrink: 0,
                borderRadius: 14,
                border: '1px dashed var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                font: '500 10px/1.3 var(--font-mono)',
                color: 'var(--muted-foreground)',
                textAlign: 'center',
                cursor: 'pointer',
                overflow: 'hidden',
              }}
            >
              {p.photo ? (
                <img src={p.photo} alt="Foto" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                '+ FOTO'
              )}
            </div>
            <div style={{ flex: 1, display: 'flex', alignSelf: 'stretch' }}>
              <UI.Textarea
                placeholder="Observaciones (opcional)…"
                value={p.observaciones}
                onChange={(e) => p.onObservaciones(e.target.value)}
                style={{ height: 78, minHeight: 78, resize: 'none', flex: 1 }}
              />
            </div>
          </div>
        </div>

        <UI.Alert>
          <UI.AlertTitle>Necesita aprobación</UI.AlertTitle>
          <UI.AlertDescription>
            La rotura se envía al responsable de almacén; queda en la cola hasta que haya cobertura.
          </UI.AlertDescription>
        </UI.Alert>
      </div>

      <UI.Separator />
      <div style={{ display: 'flex', gap: 10, padding: '12px 16px 16px', background: 'var(--card)', flexShrink: 0 }}>
        <div
          onClick={p.onBack}
          className="tap-wide"
          style={{
            height: 56,
            padding: '0 22px',
            borderRadius: 16,
            background: 'var(--secondary)',
            color: 'var(--secondary-foreground)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            font: '600 14.5px var(--font-sans)',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          Cancelar
        </div>
        <div
          onClick={p.onSave}
          className="tap-soft"
          style={{
            flex: 1,
            height: 56,
            borderRadius: 16,
            background: 'var(--destructive)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            font: '600 15.5px var(--font-sans)',
            cursor: 'pointer',
          }}
        >
          Registrar rotura
        </div>
      </div>
    </div>
  );
}
