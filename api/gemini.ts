import type { VercelRequest, VercelResponse } from '@vercel/node';
import { forwardToGemini } from '../server/gemini';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }
  // Vercel has already parsed the JSON body; the shared handler wants raw text.
  const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body ?? {});
  const { status, body } = await forwardToGemini(raw, process.env.GEMINI_API_KEY);
  res.setHeader('content-type', 'application/json');
  res.status(status).send(body);
}
