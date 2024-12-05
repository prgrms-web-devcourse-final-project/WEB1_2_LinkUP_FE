import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tsconfigPaths()],
    define: {
      'process.env': env,
    },
    server: {
      proxy: {
        '/goodbuyUs': {
          target: 'http://15.164.5.135:8080',
          changeOrigin: true,
        },
      },
    },
  };
});
