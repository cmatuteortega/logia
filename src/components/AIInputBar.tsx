import { useEffect, useRef, useState } from 'react';
import { CHIPS } from '../data/fixtures';
import { IconArrowUp, IconDestello, IconMic } from './icons';

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  placeholder?: string;
  leadingIcon?: boolean;
};

/**
 * Hold the mic to dictate, release to keep the text and swap to the send arrow —
 * sending is always a separate deliberate tap, so a slip of the thumb never fires
 * a message.
 */
export default function AIInputBar({ value, onChange, onSend, placeholder, leadingIcon }: Props) {
  const [dictating, setDictating] = useState(false);
  const [phrase, setPhrase] = useState(0);
  const typer = useRef<number | undefined>(undefined);
  const justDictated = useRef(false);

  useEffect(() => {
    if (placeholder) return;
    const id = window.setInterval(() => setPhrase((n) => n + 1), 3200);
    return () => window.clearInterval(id);
  }, [placeholder]);

  useEffect(() => () => window.clearInterval(typer.current), []);

  const startDictation = () => {
    const text = CHIPS[phrase % CHIPS.length];
    setDictating(true);
    onChange('');
    let i = 0;
    window.clearInterval(typer.current);
    typer.current = window.setInterval(() => {
      i += 1;
      onChange(text.slice(0, i));
      if (i >= text.length) window.clearInterval(typer.current);
    }, 55);
  };

  const stopDictation = () => {
    window.clearInterval(typer.current);
    if (dictating) {
      setDictating(false);
      justDictated.current = true;
    }
  };

  const hasDraft = !!value.trim() && !dictating;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        height: 64,
        padding: '0 8px 0 16px',
        borderRadius: 22,
        border: '1px solid var(--border)',
        background: 'var(--card)',
        flex: leadingIcon ? undefined : 1,
        boxSizing: 'border-box',
      }}
    >
      {leadingIcon && (
        <div style={{ color: 'var(--muted-foreground)', flexShrink: 0, display: 'flex' }}>
          <IconDestello />
        </div>
      )}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSend();
        }}
        placeholder={placeholder ?? CHIPS[phrase % CHIPS.length]}
        style={{
          flex: 1,
          minWidth: 0,
          border: 0,
          outline: 0,
          background: 'transparent',
          font: '400 14px/1 var(--font-sans)',
          color: 'var(--foreground)',
        }}
      />
      <div
        onClick={() => {
          if (justDictated.current) {
            justDictated.current = false;
            return;
          }
          onSend();
        }}
        onPointerDown={() => {
          if (value.trim()) return;
          startDictation();
        }}
        onPointerUp={stopDictation}
        onPointerLeave={stopDictation}
        className="tap"
        style={{
          width: 50,
          height: 50,
          borderRadius: 17,
          background: dictating ? 'var(--destructive)' : 'var(--primary)',
          color: 'var(--primary-foreground)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          flexShrink: 0,
          transform: dictating ? 'scale(1.06)' : 'scale(1)',
          touchAction: 'none',
          userSelect: 'none',
        }}
      >
        {hasDraft ? <IconArrowUp /> : <IconMic />}
      </div>
    </div>
  );
}
