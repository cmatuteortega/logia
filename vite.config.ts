import { defineConfig, loadEnv, type Connect, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { forwardToGemini } from './server/gemini';

function readBody(req: Connect.IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (c) => {
      raw += c;
    });
    req.on('end', () => resolve(raw));
    req.on('error', reject);
  });
}

/**
 * Local stand-in for `api/gemini.ts`. Both call the same forwarder, so the dev
 * server and the deployed function behave identically.
 */
function geminiProxy(apiKey: string): Plugin {
  return {
    name: 'gemini-proxy',
    configureServer(server) {
      server.middlewares.use('/api/gemini', async (req, res) => {
        const { status, body } = await forwardToGemini(await readBody(req), apiKey);
        res.setHeader('content-type', 'application/json');
        res.statusCode = status;
        res.end(body);
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), geminiProxy(env.GEMINI_API_KEY ?? '')],
    server: { host: true, port: 5173 },
  };
});
