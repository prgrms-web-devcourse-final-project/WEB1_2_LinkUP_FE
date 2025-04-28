import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/',
    plugins: [react(), tsconfigPaths()],
    define: {
      'process.env': env,
      global: 'globalThis',
    },
    server: {
      proxy: {
        '/goodbuyUs': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/goodbuyUs/, '/goodbuyUs'),
        },
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/api'),
        },

        '/websocket': {
          target: env.VITE_WEBSOCKET_URL,
          ws: true,
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/websocket/, ''),
          headers: {
            Connection: 'Upgrade',
            Upgrade: 'websocket',
          },
        },
      },
    },
  };
});
