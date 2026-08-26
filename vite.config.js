import { defineConfig } from 'vite';

export default defineConfig({
    base: './',
    server: {
        port: 3111
    },
    build: {
        target: 'esnext',
        chunkSizeWarningLimit: 2000,
        rollupOptions: {
            output: {
                manualChunks: {
                    mammoth: ['mammoth'],
                    xlsx: ['xlsx'],
                    jspdf: ['jspdf']
                }
            }
        }
    }
});
