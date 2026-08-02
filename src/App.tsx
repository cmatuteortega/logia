import { useCallback, useEffect, useRef, useState } from 'react';
import AndroidDevice from './components/AndroidDevice';
import { MenuSheet, NotifSheet, Toast } from './components/overlays';
import Landing from './screens/Landing';
import Chat from './screens/Chat';
import Camera, { type CamMode } from './screens/Camera';
import Lineas from './screens/Lineas';
import LineaForm from './screens/LineaForm';
import RoturaOrigen from './screens/RoturaOrigen';
import RoturaForm, { type RoturaOrigenTipo } from './screens/RoturaForm';
import Revisar from './screens/Revisar';
import RevisarLista, { type RevKind } from './screens/RevisarLista';
import Recepciones from './screens/Recepciones';
import { ALBARAN, LINEAS, MOTIVOS, cajasN, type LineaEstado } from './data/fixtures';
import {
  askAssistant,
  closeAlbaran as closeAlbaranSvc,
  pendingCount,
  saveLinea as saveLineaSvc,
  saveRotura as saveRoturaSvc,
  scanAlbaran,
  scanEtiqueta,
  type Albaran,
  type AssistantTurn,
} from './services/reception';

type Screen =
  | 'landing'
  | 'chat'
  | 'camera'
  | 'lineas'
  | 'form'
  | 'roturaOrigen'
  | 'roturaForm'
  | 'listas'
  | 'revList'
  | 'hist';

const NOTIF_COUNT = 3;
const SHOW_SYNC = true;
const QUEUED_BASE = 3;
const MIN_ANALYZING_MS = 900;

const freshLineas = (): LineaEstado[] => LINEAS.map((l) => ({ ...l, done: false, real: l.esperado }));

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing');
  const [camMode, setCamMode] = useState<CamMode>('albaran');
  const [analyzing, setAnalyzing] = useState(false);

  const [albaran, setAlbaran] = useState<Albaran>(ALBARAN);
  const [lineas, setLineas] = useState<LineaEstado[]>(freshLineas);
  const [active, setActive] = useState(0);
  const [palets, setPalets] = useState(1);
  const [labelPhotos, setLabelPhotos] = useState<Record<number, string>>({});

  const [rev, setRev] = useState<RevKind>('cant');
  const [tab, setTab] = useState('hoy');
  const [flag, setFlag] = useState(false);

  const [roturaFrom, setRoturaFrom] = useState<RoturaOrigenTipo>('balda');
  const [motivo, setMotivo] = useState(MOTIVOS[1]);
  const [rotCajas, setRotCajas] = useState(2);
  const [rotObs, setRotObs] = useState('');
  const [rotPhoto, setRotPhoto] = useState<string | null>(null);

  const [draft, setDraft] = useState('');
  const [chat, setChat] = useState<AssistantTurn[]>([]);
  const [thinking, setThinking] = useState(false);

  const [notif, setNotif] = useState(false);
  const [menu, setMenu] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const flash = useCallback((msg: string) => {
    window.clearTimeout(toastTimer.current);
    setToast(msg);
    toastTimer.current = window.setTimeout(() => setToast(null), 2800);
  }, []);

  const line = lineas[active];
  const done = lineas.filter((l) => l.done).length;
  const pend = lineas.length - done;

  const openCamera = (mode: CamMode) => {
    setCamMode(mode);
    setAnalyzing(false);
    setScreen('camera');
  };

  const startRecepcion = () => {
    setLineas(freshLineas());
    setAlbaran(ALBARAN);
    setLabelPhotos({});
    setFlag(false);
    openCamera('albaran');
  };

  const shoot = async (photo: string | null) => {
    setAnalyzing(true);
    const started = Date.now();
    const settle = async (next: Screen) => {
      const wait = MIN_ANALYZING_MS - (Date.now() - started);
      if (wait > 0) await new Promise((r) => setTimeout(r, wait));
      setAnalyzing(false);
      setScreen(next);
    };

    if (camMode === 'albaran') {
      const res = await scanAlbaran(photo);
      setAlbaran(res.albaran);
      setLineas(res.lineas.map((l) => ({ ...l, done: false, real: l.esperado })));
      setActive(0);
      await settle('lineas');
      return;
    }
    if (camMode === 'etiqueta') {
      const res = await scanEtiqueta(photo, line);
      setLineas((ls) =>
        ls.map((l, i) => (i === active ? { ...l, ean: res.ean, lote: res.lote, cad: res.cad } : l)),
      );
      if (photo) setLabelPhotos((m) => ({ ...m, [active]: photo }));
      await settle('form');
      return;
    }
    setRotPhoto(photo);
    setRoturaFrom(camMode === 'rotura-ean' ? 'balda' : 'conductor');
    await settle('roturaForm');
  };

  const send = async (text: string) => {
    const q = text.trim();
    if (!q) {
      setScreen('chat');
      return;
    }
    const history = chat;
    setChat([...history, { role: 'user', text: q }]);
    setDraft('');
    setScreen('chat');
    setNotif(false);
    setMenu(false);
    setThinking(true);
    const context = [
      `Albarán en curso: ${albaran.numero} de ${albaran.proveedor}, ${lineas.length} líneas, ${done} escaneadas, ${pend} pendientes.`,
      `Discrepancias sin revisar: 2 (Aguacate Hass −2 en ALB-2026-12471, Lima ácida −1 en ALB-2026-12463).`,
      `Caducidades cortas: Mango Kent L-2258 en 4 días (12 cajas), Plátano Canario L-2251 en 6 días (18 cajas).`,
      `Roturas de la semana: 4, 3 imputadas a Logifrío y 1 a almacén; ALB-2026-12441 pendiente de aprobación.`,
      `Cola de subida sin cobertura: ${QUEUED_BASE + pendingCount()} recepciones.`,
    ].join('\n');
    const reply = await askAssistant(q, context, history);
    setChat((c) => [...c, { role: 'ai', text: reply }]);
    setThinking(false);
  };

  const stepCajas = (d: number) =>
    setLineas((ls) => ls.map((l, i) => (i === active ? { ...l, real: Math.max(0, l.real + d) } : l)));

  const saveLinea = () => {
    const diff = line.real - line.esperado;
    void saveLineaSvc({
      albaran: albaran.numero,
      linea: line.name,
      esperado: line.esperado,
      real: line.real,
      foto: labelPhotos[active] ?? null,
    });
    setLineas((ls) => ls.map((l, i) => (i === active ? { ...l, done: true } : l)));
    setScreen('lineas');
    flash(diff === 0 ? 'Línea confirmada · en cola de subida' : `Confirmada con incidencia de ${cajasN(Math.abs(diff))}`);
  };

  const roturaTarget: Screen = roturaFrom === 'descarga' ? 'lineas' : 'landing';

  const saveRotura = () => {
    void saveRoturaSvc({
      origen: roturaFrom,
      producto: roturaFrom === 'conductor' ? albaran.numero : line.name,
      motivo,
      cajas: rotCajas,
      observaciones: rotObs,
      foto: rotPhoto,
    });
    setRotObs('');
    setScreen(roturaTarget);
    flash('Rotura registrada · pendiente de aprobación');
  };

  const closeAll = () => {
    setNotif(false);
    setMenu(false);
  };

  const camMeta: Record<CamMode, { title: string; sub: string }> = {
    albaran: { title: 'Albarán', sub: 'Paso 1 · una sola foto' },
    etiqueta: { title: line.name, sub: `Línea ${active + 1} de ${lineas.length}` },
    'rotura-ean': { title: 'EAN del producto', sub: 'Rotura en balda' },
    'rotura-albaran': { title: 'Albarán del conductor', sub: 'Rotura en entrega' },
  };

  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
      }}
    >
      <AndroidDevice>
        <div
          style={{
            position: 'relative',
            height: '100%',
            background: 'var(--background)',
            fontFamily: 'var(--font-sans)',
            overflow: 'hidden',
          }}
        >
          {screen === 'landing' && (
            <Landing
              notifCount={NOTIF_COUNT + (SHOW_SYNC ? 1 : 0)}
              revisarCount={2}
              roturaCount={1}
              draft={draft}
              onDraft={setDraft}
              onSend={() => void send(draft)}
              onMenu={() => setMenu(true)}
              onNotif={() => setNotif(true)}
              onRecepcionar={startRecepcion}
              onRevisar={() => setScreen('listas')}
              onRoturar={() => setScreen('roturaOrigen')}
            />
          )}

          {screen === 'chat' && (
            <Chat
              messages={chat}
              thinking={thinking}
              draft={draft}
              onDraft={setDraft}
              onSend={() => void send(draft)}
              onBack={() => setScreen('landing')}
            />
          )}

          {screen === 'camera' && (
            <Camera
              mode={camMode}
              title={camMeta[camMode].title}
              subtitle={camMeta[camMode].sub}
              analyzing={analyzing}
              onBack={() =>
                setScreen(camMode === 'etiqueta' ? 'lineas' : camMode === 'albaran' ? 'landing' : 'roturaOrigen')
              }
              onHistory={() => {
                closeAll();
                setScreen('hist');
              }}
              onShoot={(photo) => void shoot(photo)}
            />
          )}

          {screen === 'lineas' && (
            <Lineas
              albaran={albaran}
              lineas={lineas}
              flagged={flag}
              onBack={() => setScreen('landing')}
              onToggleFlag={() => {
                if (!flag) flash('Recepción marcada para el responsable');
                setFlag(!flag);
              }}
              onScan={(i) => {
                setActive(i);
                openCamera('etiqueta');
              }}
              onRotura={() => {
                setRoturaFrom('descarga');
                setRotPhoto(null);
                setScreen('roturaForm');
              }}
              onClose={() => {
                void closeAlbaranSvc({ albaran: albaran.numero, pendientes: pend, palets });
                setScreen('landing');
                flash(
                  pend === 0
                    ? `Albarán cerrado · ${lineas.length} líneas guardadas`
                    : `Albarán guardado con ${pend} líneas sin escanear`,
                );
              }}
            />
          )}

          {screen === 'form' && (
            <LineaForm
              albaran={albaran}
              linea={line}
              index={active}
              total={lineas.length}
              palets={palets}
              flagged={flag}
              labelPhoto={labelPhotos[active] ?? null}
              onBack={() => setScreen('lineas')}
              onToggleFlag={() => {
                if (!flag) flash('Recepción marcada para el responsable');
                setFlag(!flag);
              }}
              onCajas={stepCajas}
              onPalets={(d) => setPalets((v) => Math.max(0, v + d))}
              onRotura={() => {
                setRoturaFrom('descarga');
                setRotPhoto(null);
                setScreen('roturaForm');
              }}
              onSave={saveLinea}
            />
          )}

          {screen === 'roturaOrigen' && (
            <RoturaOrigen
              onBack={() => setScreen('landing')}
              onEan={() => {
                setRoturaFrom('balda');
                openCamera('rotura-ean');
              }}
              onAlbaran={() => {
                setRoturaFrom('conductor');
                openCamera('rotura-albaran');
              }}
            />
          )}

          {screen === 'roturaForm' && (
            <RoturaForm
              origen={roturaFrom}
              producto={roturaFrom === 'conductor' ? `${albaran.numero} · ${albaran.proveedorCorto}` : line.name}
              productoSub={
                roturaFrom === 'conductor'
                  ? `Transportista ${albaran.transportista ?? 'Logifrío'} · ${lineas.length} líneas`
                  : `EAN ${line.ean} · lote ${line.lote}`
              }
              thumb={roturaFrom === 'conductor' ? 'FOTO ALBARÁN' : 'FOTO EAN'}
              photo={rotPhoto}
              motivo={motivo}
              onMotivo={setMotivo}
              cajas={rotCajas}
              onCajas={(d) => setRotCajas((v) => Math.max(0, v + d))}
              observaciones={rotObs}
              onObservaciones={setRotObs}
              onBack={() => setScreen(roturaTarget)}
              onSave={saveRotura}
            />
          )}

          {screen === 'listas' && (
            <Revisar
              onBack={() => setScreen('landing')}
              onCantidades={() => {
                setRev('cant');
                setScreen('revList');
              }}
              onCaducidades={() => {
                setRev('cad');
                setScreen('revList');
              }}
            />
          )}

          {screen === 'revList' && <RevisarLista kind={rev} onBack={() => setScreen('listas')} />}

          {screen === 'hist' && (
            <Recepciones tab={tab} onTab={setTab} onBack={() => setScreen('camera')} onScan={startRecepcion} />
          )}

          {notif && <NotifSheet showSync={SHOW_SYNC} onClose={closeAll} />}
          {menu && (
            <MenuSheet
              pending={QUEUED_BASE + pendingCount()}
              onClose={closeAll}
              onLogout={() => {
                closeAll();
                setScreen('landing');
                flash('Sesión cerrada · 3 recepciones siguen en cola');
              }}
            />
          )}
          {toast && <Toast message={toast} />}
        </div>
      </AndroidDevice>
    </div>
  );
}
