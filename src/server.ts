import path from 'node:path';
import { fileURLToPath } from 'node:url';

import compression from 'compression';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { renderPage } from 'vite-plugin-ssr';

import { Background } from './pages/index/background';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const prod = process.env.NODE_ENV === 'production';
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ?? 3000;
const root = path.resolve(__dirname, '..');

void startServer();

async function startServer() {
  const app = express();

  app.use(compression());

  if (prod) {
    app.use(express.static(path.join(root, 'dist', 'client')));
  } else {
    const vite = await import('vite');
    const viteDevServer = await vite.createServer({
      root,
      server: { middlewareMode: true },
    });

    app.use(viteDevServer.middlewares);
  }

  app.use('/cv', express.static(path.join(root, 'cv', 'dist')));

  app.use('/background.svg', (req, res) => {
    const svg = ReactDOMServer.renderToStaticMarkup(
      React.createElement(Background, { width: 64, height: 12 })
    );

    res.header('Content-Type', 'image/svg+xml');
    res.send(svg);
  });

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.get('*', async (req, res, next) => {
    const { httpResponse } = await renderPage({
      urlOriginal: req.originalUrl,
      headers: req.headers,
    });

    if (!httpResponse) {
      return next();
    }

    const { body, statusCode, contentType, earlyHints } = httpResponse;

    res.writeEarlyHints?.({ link: earlyHints.map((e) => e.earlyHintLink) });
    res.status(statusCode).type(contentType).send(body);
  });

  app.listen(Number(port), host, () => {
    console.log(`Server running at http://${host}:${port}`);
  });
}
