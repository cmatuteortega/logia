# ailelog · Recepción de albaranes

Android-first warehouse app for receiving delivery notes (albaranes): photograph the
note, let Gemini extract every product line, then scan each product label and confirm
the real quantity so discrepancies surface on the spot. Also covers breakage
(roturas) and a review queue for quantities and short expiry dates.

Implementation of the Claude Design handoff (`Recepcion Albaranes.dc.html`).
React 18 + Vite + TypeScript, rendered against the shipped WorkspaceUI design system.

> **Note:** this repository previously held the Logia landing page (Next.js +
> Supabase). That project is preserved on the `landing-page-backup` branch.

## Running locally

```bash
npm install
cp .env.example .env.local   # add your Gemini key
npm run dev
```

Open http://localhost:5173. Under a 520px viewport the app fills the screen; above
that it renders inside the 412×892 Android frame from the prototype.

The camera needs a secure context — `localhost` works, but testing on a phone over
LAN needs HTTPS. Without camera permission the viewfinder falls back to a placeholder
and scans use fixture data.

## Deploying

Vercel builds this as a Vite app (`vercel.json` pins the framework, build command and
output directory, so no dashboard change is needed).

**Set `GEMINI_API_KEY` in the Vercel project's environment variables.** It is
deliberately not `VITE_`-prefixed, so it is only ever read server-side by the
`api/gemini` function and never enters the client bundle. Without it the app still
runs, but every AI call falls back to fixture data.

## Layout

| Path | What |
|---|---|
| `src/screens/` | one file per screen of the design |
| `src/components/` | device frame, AI input bar, steppers, overlays, icons |
| `src/services/` | Gemini calls and the write seams |
| `src/data/fixtures.ts` | offline fallback data, verbatim from the prototype |
| `server/gemini.ts` | request forwarder shared by dev proxy and deployed function |
| `api/gemini.ts` | Vercel serverless function |
| `public/ds/` | design-system bundle, copied verbatim from the handoff |

`public/ds/` reads `window.React` / `window.ReactDOM` when it evaluates, so `src/ds.ts`
installs the app's own React instances before injecting the script tag and only then
mounts. Components are reached through the `UI` proxy (`UI.Badge`, `UI.Item`, …).

## Gemini

One endpoint, `POST /api/gemini`, with the model named in the body. The Vite dev server
and the Vercel function both delegate to `server/gemini.ts`, so local and deployed
behaviour cannot drift.

| Function | Input | Output |
|---|---|---|
| `scanAlbaran` | delivery-note photo | number, supplier, date, carrier, pallets, all product lines |
| `scanEtiqueta` | label photo | EAN, lot, expiry |
| `askAssistant` | question + dock state | assistant reply |

Each falls back to `src/data/fixtures.ts` when the key is absent or the call fails, so
the app stays navigable offline — which matters, since the whole design assumes patchy
warehouse coverage and a sync queue.

`saveLinea`, `saveRotura` and `closeAlbaran` are write seams: they enqueue locally and
are the single place to plug in a real backend.

## Deviations from the prototype

- **The mic never auto-sends.** In the prototype, releasing the mic fired the message on
  the same tap. Here dictation fills the box and swaps the button to the send arrow;
  sending is a separate tap, matching what was asked for in the design chat.
- **The left-hand spec column is not implemented** — it was reviewer commentary on the
  prototype canvas, not part of the product.
- **The analyzing overlay is real work, not a fixed 1.5s timer.** It stays up for at
  least 900ms so it never flashes.
