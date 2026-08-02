import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import type { ComponentType, CSSProperties, PropsWithChildren, ReactNode } from 'react';

type Base = { className?: string; style?: CSSProperties; children?: ReactNode };
type C<P = unknown> = ComponentType<PropsWithChildren<P & Base>>;
type Variant = 'default' | 'secondary' | 'destructive' | 'outline' | 'muted';

interface WorkspaceUI {
  Separator: C;
  Badge: C<{ variant?: Variant }>;
  Progress: C<{ value?: number }>;
  Spinner: C;
  Item: C<{ variant?: Variant }>;
  ItemMedia: C;
  ItemContent: C;
  ItemTitle: C;
  ItemDescription: C;
  Card: C;
  CardHeader: C;
  CardTitle: C;
  CardDescription: C;
  CardContent: C;
  Alert: C<{ variant?: Variant }>;
  AlertTitle: C;
  AlertDescription: C;
  Textarea: C<{ placeholder?: string; value?: string; onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }>;
  Tabs: C<{ value?: string; onValueChange?: (v: string) => void }>;
  TabsList: C;
  TabsTrigger: C<{ value: string }>;
}

// The bundle reads window.React / window.ReactDOM when it evaluates, so both must
// be installed before the script tag runs — and they must be the very same module
// instances Vite gives the app, or hooks break across the two trees.
let loading: Promise<void> | null = null;

export function loadDesignSystem(): Promise<void> {
  if (loading) return loading;
  const w = window as unknown as Record<string, unknown>;
  w.React = React;
  w.ReactDOM = { ...ReactDOM, ...ReactDOMClient };
  loading = new Promise((resolve, reject) => {
    const el = document.createElement('script');
    el.src = '/ds/_ds_bundle.js';
    el.onload = () => resolve();
    el.onerror = () => reject(new Error('could not load /ds/_ds_bundle.js'));
    document.head.appendChild(el);
  });
  return loading;
}

const UI = new Proxy({} as WorkspaceUI, {
  get(_t, name: string) {
    const lib = (window as unknown as { WorkspaceUI?: Record<string, unknown> }).WorkspaceUI;
    const c = lib?.[name];
    if (!c) throw new Error(`WorkspaceUI.${name} is not available`);
    return c;
  },
});

export default UI;
