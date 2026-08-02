const MODEL = 'gemini-flash-latest';

export type Part = { text: string } | { inlineData: { mimeType: string; data: string } };

type Schema = Record<string, unknown>;

export class GeminiUnavailable extends Error {}

async function generate(parts: Part[], schema?: Schema, system?: string): Promise<string> {
  const res = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      contents: [{ parts }],
      ...(system ? { systemInstruction: { parts: [{ text: system }] } } : {}),
      generationConfig: {
        temperature: 0,
        ...(schema ? { responseMimeType: 'application/json', responseSchema: schema } : {}),
      },
    }),
  });
  const body = await res.json().catch(() => null);
  if (!res.ok || body?.error) {
    throw new GeminiUnavailable(body?.error?.message ?? `Gemini HTTP ${res.status}`);
  }
  const text = body?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof text !== 'string') throw new GeminiUnavailable('empty Gemini response');
  return text;
}

export async function generateJson<T>(parts: Part[], schema: Schema, system?: string): Promise<T> {
  const raw = await generate(parts, schema, system);
  try {
    return JSON.parse(raw) as T;
  } catch {
    throw new GeminiUnavailable('Gemini returned malformed JSON');
  }
}

export function generateText(parts: Part[], system?: string): Promise<string> {
  return generate(parts, undefined, system);
}

export const imagePart = (dataUrl: string): Part => {
  const [head, data] = dataUrl.split(',');
  const mimeType = /:(.*?);/.exec(head)?.[1] ?? 'image/jpeg';
  return { inlineData: { mimeType, data } };
};
