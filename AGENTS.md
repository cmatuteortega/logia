# ailelog · Recepción de albaranes

Vite + React 18 + TypeScript. The UI is a faithful implementation of a Claude Design
prototype — when changing a screen, match the existing inline-style idiom rather than
introducing a styling layer.

- Design-system components come from `public/ds/` via the `UI` proxy in `src/ds.ts`.
  The bundle's stylesheet is a closed set of utility classes; for any colour outside it
  use the CSS tokens directly (`var(--primary)`, `var(--destructive)`, …).
- `GEMINI_API_KEY` is server-side only. Never prefix it with `VITE_` and never read it
  from client code — it goes through `POST /api/gemini`.
- Every Gemini call must keep its fixture fallback: the app is offline-first by design.

Run `npm run typecheck` and `npm run build` before pushing.
