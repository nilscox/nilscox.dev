import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

export default withMDX({
  output: 'export',
  distDir: 'dist',
  pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
  images: { unoptimized: true },
} satisfies NextConfig);
