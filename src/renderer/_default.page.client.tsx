import ReactDOM from 'react-dom/client';
import type { PageContextClient } from './types';

import { Layout } from '../layout';
import { PageContextProvider } from './page-context';

export const clientRouting = true;
export const hydrationCanBeAborted = true;

let root: ReactDOM.Root;

export function render(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext;

  const container = document.getElementById('app') as HTMLElement;
  const page = (
    <PageContextProvider context={pageContext}>
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
