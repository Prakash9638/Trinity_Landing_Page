import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Helper to recursively copy directories for production build
function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-and-bundle-project-assets',
      // 1. Dev Server static middleware
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          try {
            const rawUrl = req.url.split('?')[0];
            const decodedUrl = decodeURIComponent(rawUrl);

            const targetPrefixes = [
              '/Logo',
              '/Living room styles',
              '/Trinity annimation photos for home page',
              '/Spaces designed around your lifestyle',
              '/Home Page Annimation 2',
              '/Home Initial and Final Images',
              '/Spaces that speak'
            ];

            const matchedPrefix = targetPrefixes.find(prefix => decodedUrl.startsWith(prefix));

            if (matchedPrefix) {
              const relativePath = decodedUrl.replace(/^\//, '');
              const filePath = path.join(process.cwd(), relativePath);

              if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
                const ext = path.extname(filePath).toLowerCase();
                let contentType = 'application/octet-stream';
                if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
                else if (ext === '.png') contentType = 'image/png';
                else if (ext === '.webp') contentType = 'image/webp';
                else if (ext === '.svg') contentType = 'image/svg+xml';
                else if (ext === '.mp4') contentType = 'video/mp4';

                const stat = fs.statSync(filePath);
                res.writeHead(200, {
                  'Content-Type': contentType,
                  'Content-Length': stat.size,
                  'Cache-Control': 'public, max-age=31536000, immutable'
                });
                return fs.createReadStream(filePath).pipe(res);
              }
            }
          } catch (e) {
            console.error('Asset middleware error:', e);
          }
          next();
        });
      },
      // 2. Production build copy hook
      closeBundle() {
        try {
          const outDir = path.join(process.cwd(), 'dist');
          if (fs.existsSync(outDir)) {
            const folders = [
              'Logo',
              'Living room styles',
              'Trinity annimation photos for home page',
              'Spaces designed around your lifestyle',
              'Home Page Annimation 2',
              'Home Initial and Final Images',
              'Spaces that speak'
            ];
            for (const folder of folders) {
              const srcFolder = path.join(process.cwd(), folder);
              const destFolder = path.join(outDir, folder);
              copyDirSync(srcFolder, destFolder);
            }
            console.log('✓ Successfully bundled Trinity assets into dist directory');
          }
        } catch (err) {
          console.error('Asset copy error during build:', err);
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true
  }
});
