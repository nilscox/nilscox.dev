import ReactDOM from 'react-dom/client';

import { getPreferredTheme, StoreTheme, Theme } from '../hooks/use-theme-mode';
import { Layout } from '../layout';

import { PageContextProvider } from './page-context';
import type { PageContextClient } from './types';

import '../monaco';

export const clientRouting = true;
export const hydrationCanBeAborted = true;

let root: ReactDOM.Root;

export function render(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext;

  const container = document.getElementById('app') as HTMLElement;

  const preferredTheme = getPreferredTheme();
  if (!pageContext.theme && preferredTheme === Theme.dark) {
    document.body.parentElement?.classList.add('dark');
  }

  const page = (
    <PageContextProvider context={pageContext}>
      <StoreTheme />
      <Layout>
        <Page {...pageProps} />
      </Layout>
    </PageContextProvider>
  );

  if (pageContext.isHydration) {
    root = ReactDOM.hydrateRoot(container, page);
  } else {
    if (!root) {
      root = ReactDOM.createRoot(container);
    }

    root.render(page);
  }
}
