import express from 'express';
import { createServer as createViteServer } from 'vite';
import { apiRouter } from './server/routes.ts';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  // JSON Body parsing
  app.use(express.json());

  // Mount NOVA CART REST API router
  app.use('/api', apiRouter);

  // Vite Dev Server middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`[NOVA CART] Server listening on port ${port}`);
  });
}

startServer().catch(err => {
  console.error('[NOVA CART] Server bootstrap error:', err);
  process.exit(1);
});
