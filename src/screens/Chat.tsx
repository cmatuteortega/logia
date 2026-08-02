import { useEffect, useRef } from 'react';
import UI from '../ds';
import AIInputBar from '../components/AIInputBar';
import { IconBack } from '../components/icons';
import type { AssistantTurn } from '../services/reception';

const GREETING: AssistantTurn = {
  role: 'ai',
  text: 'Hola Javi. Puedo consultar albaranes, discrepancias, caducidades y roturas del muelle 3.',
};

type Props = {
  messages: AssistantTurn[];
  thinking: boolean;
  draft: string;
  onDraft: (v: string) => void;
  onSend: () => void;
  onBack: () => void;
};

export default function Chat({ messages, thinking, draft, onDraft, onSend, onBack }: Props) {
  const list = messages.length ? messages : [GREETING];
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    end.current?.scrollIntoView({ block: 'end' });
  }, [messages.length, thinking]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 6,
          padding: '8px 10px',
          borderBottom: '1px solid var(--border)',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, minWidth: 0 }}>
          <div
            onClick={onBack}
            className="tap-ghost"
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--foreground)',
              flexShrink: 0,
            }}
          >
            <IconBack />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
            <div style={{ font: '600 16px/1.1 var(--font-heading)', color: 'var(--foreground)' }}>Asistente Alba</div>
            <div style={{ font: '400 11.5px/1.1 var(--font-sans)', color: 'var(--muted-foreground)' }}>
              Ve tus albaranes, stock y roturas
            </div>
          </div>
        </div>
      </div>

      <div
        className="no-shrink"
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          padding: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {list.map((m, i) => {
          const mine = m.role === 'user';
          return (
            <div key={i} style={{ display: 'flex', justifyContent: mine ? 'flex-end' : 'flex-start' }}>
              <div
                style={{
                  maxWidth: '85%',
                  padding: '11px 13px',
                  borderRadius: 16,
                  background: mine ? 'var(--primary)' : 'var(--card)',
                  color: mine ? 'var(--primary-foreground)' : 'var(--foreground)',
                  border: `1px solid ${mine ? 'var(--primary)' : 'var(--border)'}`,
                  font: '400 13.5px/1.45 var(--font-sans)',
                  textWrap: 'pretty',
                }}
              >
                {m.text}
              </div>
            </div>
          );
        })}
        {thinking && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: 'var(--muted-foreground)',
              font: '400 12.5px/1 var(--font-sans)',
            }}
          >
            <UI.Spinner />
            Consultando recepciones…
          </div>
        )}
        <div ref={end} />
      </div>

      <div
        style={{
          padding: '10px 16px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          flexShrink: 0,
        }}
      >
        <AIInputBar value={draft} onChange={onDraft} onSend={onSend} placeholder="Escribe tu pregunta" />
      </div>
    </div>
  );
}
