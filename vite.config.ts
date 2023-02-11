import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { UserConfig } from 'vite';
import ssr from 'vite-plugin-ssr/plugin';
import svgr from 'vite-plugin-svgr';

const config: UserConfig = {
  server: {
    port: 8000,
  },
  plugins: [react(), svgr(), ssr()],
  build: {
    rollupOptions: {
      plugins: [visualizer()],
    },
  },
};

export default config;
