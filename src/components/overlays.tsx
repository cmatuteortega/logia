import UI from '../ds';
import { IconDoorArrow, IconToastCheck } from './icons';
import { NOTIFS, NOTIFS_SYNC } from '../data/fixtures';

const SCRIM = {
  position: 'absolute' as const,
  inset: 0,
  background: 'rgba(20,16,12,.45)',
  zIndex: 40,
};

export function NotifSheet({ showSync, onClose }: { showSync: boolean; onClose: () => void }) {
  const notifs = showSync ? [NOTIFS_SYNC, ...NOTIFS] : NOTIFS;
  return (
    <div onClick={onClose} style={{ ...SCRIM, display: 'flex', alignItems: 'flex-end' }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          background: 'var(--card)',
          borderRadius: '24px 24px 0 0',
          padding: '14px 16px 22px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          animation: 'up .22s ease-out',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ width: 40, height: 4, borderRadius: 2, background: 'var(--border)', alignSelf: 'center' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ font: '600 19px/1.1 var(--font-heading)', color: 'var(--foreground)' }}>Notificaciones</div>
          <div
            onClick={onClose}
            style={{
              height: 44,
              display: 'flex',
              alignItems: 'center',
              padding: '0 6px',
              font: '500 12.5px var(--font-sans)',
              color: 'var(--primary)',
              cursor: 'pointer',
            }}
          >
            Marcar leídas
          </div>
        </div>
        {notifs.map((n) => (
          <UI.Item key={n.title} variant="muted">
            <UI.ItemMedia>
              <div style={{ width: 9, height: 9, borderRadius: 5, background: n.dot }} />
            </UI.ItemMedia>
            <UI.ItemContent>
              <UI.ItemTitle>{n.title}</UI.ItemTitle>
              <UI.ItemDescription>{n.body}</UI.ItemDescription>
            </UI.ItemContent>
            <div style={{ font: '400 11px var(--font-mono)', color: 'var(--muted-foreground)', whiteSpace: 'nowrap' }}>
              {n.time}
            </div>
          </UI.Item>
        ))}
        <div
          onClick={onClose}
          style={{
            height: 52,
            borderRadius: 16,
            background: 'var(--secondary)',
            color: 'var(--secondary-foreground)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            font: '600 14.5px var(--font-sans)',
            cursor: 'pointer',
            marginTop: 2,
          }}
        >
          Cerrar
        </div>
      </div>
    </div>
  );
}

export function MenuSheet({ onClose, onLogout, pending }: { onClose: () => void; onLogout: () => void; pending: number }) {
  return (
    <div
      onClick={onClose}
      style={{ ...SCRIM, padding: '14px 16px', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 256,
          background: 'var(--popover)',
          border: '1px solid var(--border)',
          borderRadius: 18,
          padding: 8,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          boxShadow: '0 18px 40px -14px rgba(0,0,0,.4)',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ padding: '10px 12px 8px', display: 'flex', flexDirection: 'column', gap: 3 }}>
          <div style={{ font: '600 14.5px/1.2 var(--font-sans)', color: 'var(--foreground)' }}>Javi Moreno</div>
          <div style={{ font: '400 12px/1.2 var(--font-sans)', color: 'var(--muted-foreground)' }}>
            Operario · Muelle 3
          </div>
        </div>
        <UI.Separator />
        <div
          onClick={onClose}
          className="menu-row"
          style={{
            height: 48,
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            borderRadius: 12,
            font: '500 14px var(--font-sans)',
            color: 'var(--foreground)',
            cursor: 'pointer',
          }}
        >
          Cambiar de muelle
        </div>
        <div
          onClick={onClose}
          className="menu-row"
          style={{
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 12px',
            borderRadius: 12,
            font: '500 14px var(--font-sans)',
            color: 'var(--foreground)',
            cursor: 'pointer',
          }}
        >
          Cola de sincronización
          <UI.Badge variant="secondary">{pending}</UI.Badge>
        </div>
        <UI.Separator />
        <div
          onClick={onLogout}
          className="menu-row-danger"
          style={{
            height: 48,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '0 12px',
            borderRadius: 12,
            font: '600 14px var(--font-sans)',
            color: 'var(--destructive)',
            cursor: 'pointer',
          }}
        >
          <IconDoorArrow size={18} strokeWidth={2} />
          Cerrar sesión
        </div>
      </div>
    </div>
  );
}

export function Toast({ message }: { message: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: 16,
        right: 16,
        bottom: 18,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: 14,
        borderRadius: 16,
        background: 'var(--foreground)',
        color: 'var(--background)',
        animation: 'up .22s ease-out',
      }}
    >
      <div style={{ color: 'var(--chart-1)', flexShrink: 0, display: 'flex' }}>
        <IconToastCheck />
      </div>
      <div style={{ flex: 1, font: '500 13.5px/1.35 var(--font-sans)' }}>{message}</div>
    </div>
  );
}
