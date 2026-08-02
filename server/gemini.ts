// Shared by the Vite dev-server middleware and the Vercel serverless function so
// the two can never drift. The API key is read by the caller from the server
// environment and never leaves it.

const HOST = 'https://generativelanguage.googleapis.com/v1beta';
const MODEL_RE = /^[\w.-]+$/;

export type Forwarded = { status: number; body: string };

const err = (status: number, error: string): Forwarded => ({ status, body: JSON.stringify({ error }) });

export async function forwardToGemini(rawBody: string, apiKey: string | undefined): Promise<Forwarded> {
  if (!apiKey) return err(503, 'GEMINI_API_KEY is not set');

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(rawBody || '{}');
  } catch {
    return err(400, 'invalid JSON body');
  }

  const { model, ...rest } = payload as { model?: unknown };
  if (typeof model !== 'string' || !MODEL_RE.test(model)) return err(400, 'invalid or missing model');

  try {
    const upstream = await fetch(`${HOST}/models/${model}:generateContent`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify(rest),
    });
    return { status: upstream.status, body: await upstream.text() };
  } catch (e) {
    return err(502, String(e));
  }
}
