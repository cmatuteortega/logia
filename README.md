# Logia — landing page

Landing de captación para el MVP concierge de Logia. Next.js (App Router) +
Tailwind CSS. Una sola CTA en toda la página que lleva al formulario de
contacto; el formulario guarda los leads en Supabase.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Configurar Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. Ejecuta `supabase/leads.sql` en el SQL editor del proyecto para crear la
   tabla `leads`.
3. Copia `.env.example` a `.env.local` y rellena:
   - `SUPABASE_URL`: URL del proyecto.
   - `SUPABASE_SERVICE_ROLE_KEY`: service role key (Settings → API). Se usa
     solo en el servidor (`app/api/leads/route.ts`), nunca se expone al
     cliente.

Sin estas variables configuradas, el formulario responderá con un error al
enviarse.

## Deploy

Pensado para desplegar en [Vercel](https://vercel.com). Añade las mismas
variables de entorno (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`) en la
configuración del proyecto en Vercel.
