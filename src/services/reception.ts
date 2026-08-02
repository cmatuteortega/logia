import { ALBARAN, LINEAS, type Linea } from '../data/fixtures';
import { generateJson, generateText, imagePart, type Part } from './gemini';

export type Albaran = {
  numero: string;
  proveedor: string;
  proveedorCorto: string;
  fecha: string;
  palets: string;
  transportista?: string;
};

export type ScanAlbaranResult = { albaran: Albaran; lineas: Linea[]; source: 'gemini' | 'fixture' };
export type ScanEtiquetaResult = { name?: string; ean: string; lote: string; cad: string; source: 'gemini' | 'fixture' };

const OCR_SYSTEM =
  'Eres el OCR de una app de almacén española que recepciona albaranes de mercancía. ' +
  'Respondes solo con los datos que aparecen en la imagen, sin inventar. ' +
  'Si un campo no es legible, devuélvelo vacío.';

const ALBARAN_SCHEMA = {
  type: 'OBJECT',
  properties: {
    numero: { type: 'STRING' },
    proveedor: { type: 'STRING' },
    fecha: { type: 'STRING' },
    transportista: { type: 'STRING' },
    palets: { type: 'INTEGER' },
    lineas: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          name: { type: 'STRING' },
          ean: { type: 'STRING' },
          esperado: { type: 'INTEGER' },
          udsCaja: { type: 'INTEGER' },
          unidad: { type: 'STRING' },
          lote: { type: 'STRING' },
          cad: { type: 'STRING' },
        },
        required: ['name', 'esperado'],
      },
    },
  },
  required: ['numero', 'proveedor', 'lineas'],
};

const ETIQUETA_SCHEMA = {
  type: 'OBJECT',
  properties: {
    name: { type: 'STRING' },
    ean: { type: 'STRING' },
    lote: { type: 'STRING' },
    cad: { type: 'STRING' },
  },
  required: ['ean'],
};

const FIXTURE_ALBARAN: Albaran = { ...ALBARAN };

const shortName = (proveedor: string) =>
  proveedor.replace(/\s*(S\.?L\.?U?|S\.?A\.?|C\.?B\.?)\.?\s*$/i, '').trim() || proveedor;

/** Photo of the delivery note → supplier, number and every product line. */
export async function scanAlbaran(photo: string | null): Promise<ScanAlbaranResult> {
  if (!photo) return { albaran: FIXTURE_ALBARAN, lineas: LINEAS, source: 'fixture' };
  try {
    const out = await generateJson<{
      numero: string;
      proveedor: string;
      fecha?: string;
      transportista?: string;
      palets?: number;
      lineas: Array<Partial<Linea> & { name: string; esperado: number }>;
    }>(
      [
        { text: 'Extrae del albarán: número, proveedor, fecha, transportista, nº de palets y todas las líneas de producto. "esperado" es el número de cajas de esa línea.' },
        imagePart(photo),
      ],
      ALBARAN_SCHEMA,
      OCR_SYSTEM,
    );
    const lineas: Linea[] = (out.lineas ?? [])
      .filter((l) => l.name)
      .map((l) => ({
        name: l.name,
        esperado: l.esperado ?? 0,
        udsCaja: l.udsCaja || 1,
        unidad: l.unidad || 'cajas',
        ean: l.ean ?? '',
        lote: l.lote ?? '',
        cad: l.cad ?? '',
      }));
    if (!lineas.length) return { albaran: FIXTURE_ALBARAN, lineas: LINEAS, source: 'fixture' };
    return {
      albaran: {
        numero: out.numero || FIXTURE_ALBARAN.numero,
        proveedor: out.proveedor || FIXTURE_ALBARAN.proveedor,
        proveedorCorto: shortName(out.proveedor || FIXTURE_ALBARAN.proveedor),
        fecha: out.fecha || FIXTURE_ALBARAN.fecha,
        palets: out.palets ? `${out.palets} palet${out.palets === 1 ? '' : 's'}` : FIXTURE_ALBARAN.palets,
        transportista: out.transportista,
      },
      lineas,
      source: 'gemini',
    };
  } catch {
    return { albaran: FIXTURE_ALBARAN, lineas: LINEAS, source: 'fixture' };
  }
}

/** Photo of the product label → EAN, lot and expiry, stored on the product record. */
export async function scanEtiqueta(photo: string | null, expected: Linea): Promise<ScanEtiquetaResult> {
  const fixture: ScanEtiquetaResult = { ean: expected.ean, lote: expected.lote, cad: expected.cad, source: 'fixture' };
  if (!photo) return fixture;
  try {
    const out = await generateJson<{ name?: string; ean?: string; lote?: string; cad?: string }>(
      [
        { text: `Etiqueta del producto "${expected.name}". Extrae EAN (código de barras), lote y fecha de caducidad en formato DD/MM/AA.` },
        imagePart(photo),
      ],
      ETIQUETA_SCHEMA,
      OCR_SYSTEM,
    );
    if (!out.ean && !out.lote && !out.cad) return fixture;
    return {
      name: out.name || undefined,
      ean: out.ean || expected.ean,
      lote: out.lote || expected.lote,
      cad: out.cad || expected.cad,
      source: 'gemini',
    };
  } catch {
    return fixture;
  }
}

const ASSISTANT_SYSTEM =
  'Eres Alba, la asistente de un almacén de fruta. Hablas con Javi, operario del muelle 3. ' +
  'Respondes en español, en 2 o 3 frases, concretas y sin rodeos, usando solo el estado del muelle que se te pasa.';

const FALLBACK = (q: string) => {
  const t = q.toLowerCase();
  if (t.includes('revisar') || t.includes('falta') || t.includes('discrep'))
    return 'Tienes 2 discrepancias sin revisar: −2 cajas de Aguacate Hass (ALB-2026-12471) y −1 de Lima ácida (ALB-2026-12463). También hay 3 recepciones en cola de subida.';
  if (t.includes('rotura'))
    return 'Esta semana: 4 roturas, 3 imputadas al transportista Logifrío y 1 a almacén. Una sigue pendiente de aprobación del responsable (ALB-2026-12441).';
  if (t.includes('caduc') || t.includes('lote'))
    return 'Lotes cortos: Mango Kent L-2258 caduca en 4 días (12 cajas) y Plátano Canario L-2251 en 6 días (18 cajas). Recomiendo sacarlos a venta antes del viernes.';
  return 'Con los albaranes de hoy: 5 recepciones cerradas, 1 en curso (Frutas Beltrán) y 2 discrepancias sin revisar. Dime si quieres el detalle de una en concreto.';
};

export type AssistantTurn = { role: 'user' | 'ai'; text: string };

export async function askAssistant(question: string, context: string, history: AssistantTurn[]): Promise<string> {
  try {
    const parts: Part[] = [
      { text: `Estado del muelle 3:\n${context}` },
      ...history.slice(-6).map((m) => ({ text: `${m.role === 'user' ? 'Javi' : 'Alba'}: ${m.text}` })),
      { text: `Javi: ${question}` },
    ];
    return (await generateText(parts, ASSISTANT_SYSTEM)).trim();
  } catch {
    return FALLBACK(question);
  }
}

// ---------------------------------------------------------------------------
// Write seams. No backend exists yet; these are the single place to swap in the
// real endpoints, and they keep the optimistic-UI contract the screens rely on.
// ---------------------------------------------------------------------------

export type LineaConfirmada = { albaran: string; linea: string; esperado: number; real: number; foto: string | null };
export type RoturaRegistrada = {
  origen: 'balda' | 'conductor' | 'descarga';
  producto: string;
  motivo: string;
  cajas: number;
  observaciones: string;
  foto: string | null;
};

const queue: Array<{ kind: string; payload: unknown; at: number }> = [];

function enqueue(kind: string, payload: unknown) {
  queue.push({ kind, payload, at: Date.now() });
  return Promise.resolve({ queued: true, pending: queue.length });
}

export const saveLinea = (payload: LineaConfirmada) => enqueue('linea', payload);
export const saveRotura = (payload: RoturaRegistrada) => enqueue('rotura', payload);
export const closeAlbaran = (payload: { albaran: string; pendientes: number; palets: number }) =>
  enqueue('cierre', payload);
export const pendingCount = () => queue.length;
