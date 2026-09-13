import { defineConfig, build } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function hideSrcFolderDevPlugin() {
    let isBuilding = false;
    let rebuildTimeout = null;

    async function triggerBuild() {
        if (isBuilding) return;
        isBuilding = true;
        try {
            await build({
                configFile: false,
                base: './',
                plugins: [viteSingleFile()],
                esbuild: {
                    legalComments: 'none',
                    minifyIdentifiers: true,
                    minifySyntax: true,
                    minifyWhitespace: true,
                    drop: ['debugger']
                },
                build: {
                    target: 'esnext',
                    sourcemap: false,
                    emptyOutDir: false,
                    chunkSizeWarningLimit: 2000
                }
            });
            console.log('[Coralgenz Vault] Secure bundle rebuilt. Source folder isolation active.');
        } catch (e) {
            console.error('[Coralgenz Vault] Rebuild error:', e);
        } finally {
            isBuilding = false;
        }
    }

    return {
        name: 'hide-src-folder-dev-plugin',
        apply: 'serve',
        async configureServer(server) {
            const distIndex = path.resolve(__dirname, 'dist', 'index.html');

            if (!fs.existsSync(distIndex)) {
                await triggerBuild();
            }

            server.watcher.on('change', (file) => {
                if ((file.includes('/src/') || file.endsWith('index.html') || file.endsWith('.css') || file.endsWith('.js')) && !file.includes('/dist/')) {
                    clearTimeout(rebuildTimeout);
                    rebuildTimeout = setTimeout(() => {
                        triggerBuild();
                    }, 300);
                }
            });

            server.middlewares.use((req, res, next) => {
                const url = (req.url || '').split('?')[0];

                // Completely block /src/ directory access
                if (url.startsWith('/src/') || url === '/src') {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('Not Found: Directory is protected');
                    return;
                }

                // Serve compiled single-file distribution for main page requests
                if (url === '/' || url === '/index.html') {
                    if (fs.existsSync(distIndex)) {
                        const html = fs.readFileSync(distIndex, 'utf-8');
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'text/html; charset=utf-8');
                        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
                        res.end(html);
                        return;
                    }
                }

                next();
            });
        }
    };
}

export default defineConfig({
    base: './',
    server: {
        port: 3111
    },
    plugins: [
        viteSingleFile(),
        hideSrcFolderDevPlugin()
    ],
    esbuild: {
        legalComments: 'none',
        minifyIdentifiers: true,
        minifySyntax: true,
        minifyWhitespace: true,
        drop: ['debugger']
    },
    build: {
        target: 'esnext',
        sourcemap: false,
        chunkSizeWarningLimit: 2000
    }
});
