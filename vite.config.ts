import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, type Plugin } from 'vite';

function apiDevPlugin(): Plugin {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/health' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          return res.end(
            JSON.stringify({
              status: 'ok',
              storage: 'persistent-json-db',
              timestamp: new Date().toISOString(),
            })
          );
        }

        if (req.url === '/api/applications' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const dataDir = path.resolve(import.meta.dirname, 'data');
              const dbFile = path.resolve(dataDir, 'applications.json');

              if (!fs.existsSync(dataDir)) {
                fs.mkdirSync(dataDir, { recursive: true });
              }
              let list = [];
              if (fs.existsSync(dbFile)) {
                try {
                  list = JSON.parse(fs.readFileSync(dbFile, 'utf-8'));
                } catch {
                  list = [];
                }
              }

              const id = `AC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
              const submittedAt = new Date().toISOString();
              const record = {
                id,
                fullName: (data.fullName || '').trim(),
                phone: (data.phone || '').trim(),
                email: (data.email || '').trim().toLowerCase(),
                portfolioUrl: (data.portfolioUrl || '').trim(),
                agreedToTerms: Boolean(data.agreedToTerms),
                submittedAt,
              };

              list.push(record);
              fs.writeFileSync(dbFile, JSON.stringify(list, null, 2), 'utf-8');

              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 201;
              return res.end(
                JSON.stringify({
                  success: true,
                  applicationId: id,
                  message: 'Application received and securely saved.',
                  submittedAt,
                })
              );
            } catch (err: any) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              return res.end(
                JSON.stringify({ success: false, error: err.message || 'Invalid request' })
              );
            }
          });
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss(), apiDevPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
