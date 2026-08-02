import { useCamera } from '../hooks/useCamera';
import { IconBack, IconClock, IconTorch } from '../components/icons';

export type CamMode = 'albaran' | 'etiqueta' | 'rotura-ean' | 'rotura-albaran';

const GUIDES: Record<CamMode, string> = {
  albaran: 'Encaja el albarán completo dentro del marco',
  etiqueta: 'Etiqueta del producto: EAN y caducidad legibles',
  'rotura-ean': 'Centra el código de barras del producto',
  'rotura-albaran': 'Encaja el albarán del conductor en el marco',
};

const FRAME: Record<CamMode, { top: string; bottom: string }> = {
  albaran: { top: '14%', bottom: '20%' },
  etiqueta: { top: '26%', bottom: '30%' },
  'rotura-ean': { top: '32%', bottom: '36%' },
  'rotura-albaran': { top: '14%', bottom: '20%' },
};

export const ANALYZING: Record<CamMode, [string, string]> = {
  albaran: ['Leyendo el albarán…', 'Extrayendo proveedor, nº de albarán y todas las líneas de producto.'],
  etiqueta: ['Leyendo la etiqueta…', 'EAN y caducidad se guardan en la ficha para que el próximo escaneo sea directo.'],
  'rotura-ean': ['Buscando el producto…', 'Cruzando el EAN con el stock de la balda.'],
  'rotura-albaran': ['Leyendo el albarán…', 'Identificando entrega y transportista para imputar la rotura.'],
};

type Props = {
  mode: CamMode;
  title: string;
  subtitle: string;
  analyzing: boolean;
  onBack: () => void;
  onHistory: () => void;
  onShoot: (photo: string | null) => void;
};

const corner = (v: 'top' | 'bottom', h: 'left' | 'right', frame: { top: string; bottom: string }) => ({
  position: 'absolute' as const,
  [h]: '8%',
  [v]: v === 'top' ? frame.top : frame.bottom,
  width: 34,
  height: 34,
  [`border${h === 'left' ? 'Left' : 'Right'}`]: '3px solid var(--chart-1)',
  [`border${v === 'top' ? 'Top' : 'Bottom'}`]: '3px solid var(--chart-1)',
  [`border${v === 'top' ? 'Top' : 'Bottom'}${h === 'left' ? 'Left' : 'Right'}Radius`]: 12,
});

export default function Camera({ mode, title, subtitle, analyzing, onBack, onHistory, onShoot }: Props) {
  const cam = useCamera(!analyzing);
  const frame = FRAME[mode];
  const [analyzingTitle, analyzingBody] = ANALYZING[mode];

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#14100c' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 10px',
            flexShrink: 0,
          }}
        >
          <div
            onClick={onBack}
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#fff',
            }}
          >
            <IconBack />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, minWidth: 0 }}>
            <div style={{ font: '600 15px/1 var(--font-heading)', color: '#fff' }}>{title}</div>
            <div style={{ font: '400 11.5px/1 var(--font-sans)', color: 'rgba(255,255,255,.55)' }}>{subtitle}</div>
          </div>
          <div
            onClick={onHistory}
            className="tap"
            style={{
              position: 'relative',
              width: 48,
              height: 48,
              borderRadius: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#fff',
            }}
          >
            <IconClock />
            <div
              style={{
                position: 'absolute',
                top: 6,
                right: 6,
                width: 8,
                height: 8,
                borderRadius: 4,
                background: 'var(--destructive)',
              }}
            />
          </div>
        </div>

        <div style={{ height: 8, flexShrink: 0 }} />

        <div
          style={{
            flex: 1,
            minHeight: 0,
            position: 'relative',
            margin: '0 12px',
            borderRadius: 20,
            overflow: 'hidden',
            background: '#221c15',
          }}
        >
          <video
            ref={cam.videoRef}
            playsInline
            muted
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: cam.ready ? 'block' : 'none',
            }}
          />
          {!cam.ready && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ font: '500 12px/1.5 var(--font-mono)', color: 'rgba(255,255,255,.26)', textAlign: 'center' }}>
                VISTA DE CÁMARA
                <br />
                (placeholder)
              </div>
            </div>
          )}
          <div
            style={{
              position: 'absolute',
              left: '8%',
              right: '8%',
              top: frame.top,
              bottom: frame.bottom,
              borderRadius: 12,
              boxShadow: '0 0 0 9999px rgba(0,0,0,.36)',
            }}
          />
          <div style={corner('top', 'left', frame)} />
          <div style={corner('top', 'right', frame)} />
          <div style={corner('bottom', 'left', frame)} />
          <div style={corner('bottom', 'right', frame)} />
          <div
            style={{
              position: 'absolute',
              left: '8%',
              right: '8%',
              height: 2,
              background: 'linear-gradient(90deg,transparent,var(--chart-1),transparent)',
              animation: 'scanline 2.6s ease-in-out infinite alternate',
            }}
          />
          <div
            onClick={cam.toggleTorch}
            className="tap"
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              width: 44,
              height: 44,
              borderRadius: 22,
              background: 'rgba(0,0,0,.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: cam.torch ? 'var(--chart-1)' : 'rgba(255,255,255,.55)',
            }}
          >
            <IconTorch />
          </div>
          <div style={{ position: 'absolute', left: 16, right: 16, bottom: 14, display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                maxWidth: '100%',
                padding: '9px 14px',
                borderRadius: 12,
                background: 'rgba(0,0,0,.62)',
                font: '500 13px/1.35 var(--font-sans)',
                color: '#fff',
                textAlign: 'center',
              }}
            >
              {GUIDES[mode]}
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 30,
            padding: '14px 22px 16px',
            flexShrink: 0,
          }}
        >
          <div style={{ width: 64 }} />
          <div
            onClick={() => onShoot(cam.capture())}
            className="tap"
            style={{
              width: 82,
              height: 82,
              borderRadius: 41,
              border: '4px solid rgba(255,255,255,.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ width: 64, height: 64, borderRadius: 32, background: '#fff' }} />
          </div>
          <div
            onClick={() => onShoot(null)}
            style={{
              width: 64,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12,
              font: '500 12.5px var(--font-sans)',
              color: 'rgba(255,255,255,.7)',
              cursor: 'pointer',
            }}
          >
            Manual
          </div>
        </div>
      </div>

      {analyzing && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(20,16,12,.88)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 18,
            padding: '0 20px',
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,
              border: '3px solid rgba(255,255,255,.18)',
              borderTopColor: 'var(--chart-1)',
              animation: 'spin .9s linear infinite',
            }}
          />
          <div style={{ font: '600 17px/1.3 var(--font-heading)', color: '#fff', textAlign: 'center' }}>
            {analyzingTitle}
          </div>
          <div
            style={{
              font: '400 13px/1.45 var(--font-sans)',
              color: 'rgba(255,255,255,.6)',
              textAlign: 'center',
              maxWidth: 250,
            }}
          >
            {analyzingBody}
          </div>
        </div>
      )}
    </div>
  );
}
