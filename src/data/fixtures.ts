export type Linea = {
  name: string;
  esperado: number;
  udsCaja: number;
  unidad: string;
  ean: string;
  lote: string;
  cad: string;
};

export type LineaEstado = Linea & { done: boolean; real: number };

export const ALBARAN = {
  numero: 'ALB-2026-12480',
  proveedor: 'Frutas Beltrán S.L.',
  proveedorCorto: 'Frutas Beltrán',
  fecha: '30 jul',
  palets: '1 palet',
};

export const LINEAS: Linea[] = [
  { name: 'Plátano Canario IGP', esperado: 18, udsCaja: 1, unidad: 'cajas 18 kg', ean: '8412345671111', lote: 'L-2251', cad: '05/08/26' },
  { name: 'Naranja Navelina 8 kg', esperado: 30, udsCaja: 8, unidad: 'cajas 8 kg', ean: '8412345672222', lote: 'L-2254', cad: '18/08/26' },
  { name: 'Aguacate Hass cal. 16', esperado: 24, udsCaja: 4, unidad: 'cajas 4 kg', ean: '8412345678904', lote: 'L-2260', cad: '12/08/26' },
  { name: 'Mango Kent', esperado: 12, udsCaja: 6, unidad: 'cajas 5 kg', ean: '8412345673333', lote: 'L-2258', cad: '09/08/26' },
  { name: 'Lima ácida 5 kg', esperado: 6, udsCaja: 10, unidad: 'cajas 5 kg', ean: '8412345674444', lote: 'L-2259', cad: '22/08/26' },
];

export const MOTIVOS = ['Caja aplastada', 'Producto dañado', 'Cadena de frío', 'Falta mercancía'];

export const CHIPS = ['¿Qué me falta por revisar?', 'Roturas de esta semana', 'Caducidades cortas'];

export const cajasN = (n: number) => (n === 1 ? '1 caja' : `${n} cajas`);

export const NOTIFS_SYNC = {
  title: '3 recepciones en cola',
  body: 'Sin cobertura · se suben solas al recuperar señal',
  time: 'ahora',
  dot: 'var(--muted-foreground)',
};

export const NOTIFS = [
  { title: 'Discrepancia sin revisar', body: 'ALB-2026-12466 · Frutas Beltrán: −2 cajas de aguacate', time: '12:04', dot: 'var(--destructive)' },
  { title: 'Camión en muelle 3', body: 'Hortalizas del Sur · 5 albaranes asignados a ti', time: '11:20', dot: 'var(--chart-2)' },
  { title: 'Rotura pendiente de aprobación', body: 'ALB-2026-12441 · esperando al responsable', time: '09:58', dot: 'var(--muted-foreground)' },
];

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

export const RECEPCIONES_HOY = [
  { initials: 'FB', title: 'Frutas Beltrán', sub: 'ALB-2026-12480 · 5 líneas', tag: 'En curso', time: '12:31', iconBg: 'var(--primary)', iconFg: 'var(--primary-foreground)', badgeVariant: 'default' as BadgeVariant },
  { initials: 'HS', title: 'Hortalizas del Sur', sub: 'ALB-2026-12471 · 12 líneas', tag: 'Discrepancia', time: '11:47', iconBg: 'var(--muted)', iconFg: 'var(--foreground)', badgeVariant: 'destructive' as BadgeVariant },
  { initials: 'LC', title: 'Lácteos Coval', sub: 'ALB-2026-12468 · 4 líneas', tag: 'Cerrado', time: '10:12', iconBg: 'var(--muted)', iconFg: 'var(--foreground)', badgeVariant: 'secondary' as BadgeVariant },
  { initials: 'PN', title: 'Pescados Nores', sub: 'ALB-2026-12463 · 2 líneas', tag: 'Rotura', time: '09:40', iconBg: 'var(--muted)', iconFg: 'var(--foreground)', badgeVariant: 'destructive' as BadgeVariant },
  { initials: 'CB', title: 'Congelados Brea', sub: 'ALB-2026-12455 · 9 líneas', tag: 'Cerrado', time: '08:15', iconBg: 'var(--muted)', iconFg: 'var(--foreground)', badgeVariant: 'secondary' as BadgeVariant },
];

export const RECEPCIONES_ESPERADAS = [
  { initials: 'VG', title: 'Verduras Gandía', sub: 'Lunes y jueves · 8 líneas habituales', tag: 'Esperada', time: '~14:00', iconBg: 'var(--muted)', iconFg: 'var(--foreground)', badgeVariant: 'outline' as BadgeVariant },
  { initials: 'PA', title: 'Panadería Alba', sub: 'Diario · 3 líneas habituales', tag: 'Esperada', time: '~15:30', iconBg: 'var(--muted)', iconFg: 'var(--foreground)', badgeVariant: 'outline' as BadgeVariant },
  { initials: 'FB', title: 'Frutas Beltrán', sub: '2º reparto · 6 de las últimas 8 semanas', tag: 'Probable', time: '~17:00', iconBg: 'var(--muted)', iconFg: 'var(--foreground)', badgeVariant: 'secondary' as BadgeVariant },
  { initials: 'LC', title: 'Lácteos Coval', sub: 'Viernes · 4 líneas habituales', tag: 'Probable', time: '~18:15', iconBg: 'var(--muted)', iconFg: 'var(--foreground)', badgeVariant: 'secondary' as BadgeVariant },
];

const DANGER_BG = 'oklch(0.577 0.245 27.325 / .12)';

export const REV_CANTIDADES = [
  { mark: '−2', title: 'Aguacate Hass cal. 16', sub: 'ALB-2026-12471 · Hortalizas del Sur · 22 de 24', tag: 'Sin revisar', badgeVariant: 'destructive' as BadgeVariant, iconBg: DANGER_BG, iconFg: 'var(--destructive)' },
  { mark: '−1', title: 'Lima ácida 5 kg', sub: 'ALB-2026-12463 · Pescados Nores · 5 de 6', tag: 'Sin revisar', badgeVariant: 'destructive' as BadgeVariant, iconBg: DANGER_BG, iconFg: 'var(--destructive)' },
  { mark: '+3', title: 'Naranja Navelina 8 kg', sub: 'ALB-2026-12455 · Congelados Brea · 33 de 30', tag: 'Aceptada', badgeVariant: 'secondary' as BadgeVariant, iconBg: 'var(--muted)', iconFg: 'var(--foreground)' },
];

export const REV_CADUCIDADES = [
  { mark: '4d', title: 'Mango Kent · L-2258', sub: 'ALB-2026-12480 · cad. 09/08/26 · 12 cajas', tag: 'Corta', badgeVariant: 'destructive' as BadgeVariant, iconBg: DANGER_BG, iconFg: 'var(--destructive)' },
  { mark: '6d', title: 'Plátano Canario IGP · L-2251', sub: 'ALB-2026-12480 · cad. 05/08/26 · 18 cajas', tag: 'Corta', badgeVariant: 'destructive' as BadgeVariant, iconBg: DANGER_BG, iconFg: 'var(--destructive)' },
  { mark: '13d', title: 'Aguacate Hass cal. 16 · L-2260', sub: 'ALB-2026-12480 · cad. 12/08/26 · 24 cajas', tag: 'Vigilar', badgeVariant: 'secondary' as BadgeVariant, iconBg: 'var(--muted)', iconFg: 'var(--foreground)' },
];
