import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import path from 'path';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
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
            'process.env': {
                NEXT_PUBLIC_BASE_URL: env.NEXT_PUBLIC_BASE_URL,
                NEXT_PUBLIC_BACKEND_URL: env.NEXT_PUBLIC_BACKEND_URL,
                NEXT_PUBLIC_API_URL: env.NEXT_PUBLIC_API_URL,
            }
        }
    };
});
