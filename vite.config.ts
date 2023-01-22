/// <reference types="vite-plugin-svgr/client" />

import react from '@vitejs/plugin-react';
import ssr from 'vite-plugin-ssr/plugin';
import svgr from 'vite-plugin-svgr';
import { UserConfig } from 'vite';

const config: UserConfig = {
  server: {
    port: 8000,
  },
  plugins: [react(), svgr(), ssr()],
};

export default config;
