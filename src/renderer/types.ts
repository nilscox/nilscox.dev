import type { PageContextBuiltIn } from 'vite-plugin-ssr';
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client';

import { Theme } from '../hooks/use-theme-mode';

type Page = (pageProps: PageProps) => React.ReactElement;
type PageProps = Record<string, unknown>;

export type PageContextCustom = {
  header?: { text: string; link: string };
  pageProps?: PageProps;
};

// prettier-ignore
export type PageContextServer = PageContextBuiltIn<Page> & PageContextCustom & { headers: Record<string, string> };
export type PageContextClient = PageContextBuiltInClient<Page> & PageContextCustom & { theme: Theme };
