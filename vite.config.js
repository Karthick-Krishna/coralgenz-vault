import { defineConfig, build } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function encodeHtmlToHideSource(html) {
    const encoded = Buffer.from(html, "utf-8").toString("base64");
    return `<!DOCTYPE html><html><head><title>Coralgenz Vault</title><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body{background:#05070a;color:#1e293b;font-family:monospace;padding:2rem;text-align:center;}noscript{color:#f87171;}</style></head><body><noscript>Security Protocol: JavaScript is required to decrypt this vault.</noscript><script>
    (function(){
      try {
        var text = atob("${encoded}");
        var bytes = new Uint8Array(text.length);
        for (var i = 0; i < text.length; i++) bytes[i] = text.charCodeAt(i);
        document.open();
        document.write(new TextDecoder().decode(bytes));
        document.close();
      } catch(e) {
        document.body.innerHTML = "Security protocol failure. Initialization aborted.";
      }
    })();
    </script></body></html>`;
}

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
            
            // Obfuscate the newly built file immediately
            const distIndex = path.resolve(__dirname, 'dist', 'index.html');
            if (fs.existsSync(distIndex)) {
                const html = fs.readFileSync(distIndex, 'utf-8');
                if (!html.includes('atob("')) { // prevent double encoding
                    fs.writeFileSync(distIndex, encodeHtmlToHideSource(html));
                }
            }
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

function obfuscateProductionHtmlPlugin() {
    return {
        name: 'obfuscate-production-html-plugin',
        apply: 'build',
        closeBundle() {
            const distIndex = path.resolve(__dirname, 'dist', 'index.html');
            if (fs.existsSync(distIndex)) {
                const html = fs.readFileSync(distIndex, 'utf-8');
                if (!html.includes('atob("')) {
                    fs.writeFileSync(distIndex, encodeHtmlToHideSource(html));
                    console.log('[Coralgenz Vault] Production HTML obfuscated to prevent view-source exposure.');
                }
            }
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
        hideSrcFolderDevPlugin(),
        obfuscateProductionHtmlPlugin()
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
