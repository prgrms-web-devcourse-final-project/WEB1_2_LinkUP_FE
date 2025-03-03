import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tsconfigPaths()],
    define: {
      'process.env': env,
      global: {},
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
          target: 'http://15.164.5.135',
          ws: true,
          changeOrigin: true,
        },
      },
    },
  };
});
