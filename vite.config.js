import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
    css: {
        postcss: {
            plugins: [
                tailwindcss(),
            ],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js/src'),
        },
    },
    define: {
        'process.env': {}
    }
});
