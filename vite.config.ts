/// <reference types="vite-plugin-svgr/client" />

import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { UserConfig } from 'vite';
import ssr from 'vite-plugin-ssr/plugin';
import svgr from 'vite-plugin-svgr';

const config: UserConfig = {
  ssr: {
    noExternal: ['react-notion-x'],
  },
  server: {
    port: 8000,
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  plugins: [react(), svgr(), ssr(), visualizer()],
};

export default config;
