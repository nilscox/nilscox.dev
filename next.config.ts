import type { NextConfig } from 'next';

export default {
  output: 'export',
  distDir: 'dist',
  images: { unoptimized: true },
} satisfies NextConfig;
