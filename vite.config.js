import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
    base: './',
    server: {
        port: 3111
    },
    plugins: [
        viteSingleFile()
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
