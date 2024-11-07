import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import {resolve} from 'path';

export default defineConfig({
    plugins: [handlebars()],
    root: '.',
    server: {
        port: 3000,
    },
    build: {
        outDir: 'dist',
        sourcemap: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            },
        }
    },
    css: {
        postcss: './postcss.config.js',
    },
})