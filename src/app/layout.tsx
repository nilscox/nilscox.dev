import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '',
  description: '',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
