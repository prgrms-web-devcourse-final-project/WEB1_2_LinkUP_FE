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
        '/api': {
          target: 'http://15.164.5.135:8080', // 백엔드 주소
          changeOrigin: true, // CORS 우회
          rewrite: (path) => path.replace(/^\/api/, '/api'), // 이 부분은 경로를 그대로 두어야 함
        },
      },
    },
  };
});
