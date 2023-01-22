import ReactDOMServer from 'react-dom/server';
import { dangerouslySkipEscape, escapeInject } from 'vite-plugin-ssr';

import { Layout } from '../layout';
import { PageContextProvider } from './page-context';
import type { PageContextServer } from './types';

export const passToClient = ['pageProps'];

export function render(pageContext: PageContextServer) {
  const { Page } = pageContext;

  const html = ReactDOMServer.renderToString(
    <Document title="nilscox.dev">
      <PageContextProvider context={pageContext}>
        <Layout>
          <Page />
        </Layout>
      </PageContextProvider>
    </Document>
  );

  const documentHtml = escapeInject`<!DOCTYPE html>${dangerouslySkipEscape(html)}`;

  return {
    documentHtml,
    pageContext: {},
  };
}

type DocumentProps = {
  title: string;
  children: React.ReactNode;
};

const Document = ({ title, children }: DocumentProps) => (
  <html lang="fr">
    <head>
      <meta charSet="UTF-8" />
      {/* <link rel="icon" href="logoUrl" /> */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="" />
      <title>{title}</title>
    </head>

    <body className="bg-neutral text-neutral">
      <div id="app">{children}</div>
    </body>
  </html>
);
