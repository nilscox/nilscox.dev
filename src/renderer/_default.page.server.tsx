import dotenv from 'dotenv';
import ReactDOMServer from 'react-dom/server';
import { dangerouslySkipEscape, escapeInject } from 'vite-plugin-ssr';

import { isTheme, Theme } from '../hooks/use-theme-mode';
import { Layout } from '../layout';

import { PageContextProvider } from './page-context';
import type { PageContextServer } from './types';

dotenv.config();

export const passToClient = ['theme', 'header', 'pageProps'];

export function render(pageContext: PageContextServer) {
  const { Page, pageProps } = pageContext;
  const theme = getTheme(pageContext);

  const html = ReactDOMServer.renderToString(
    <Document theme={theme} title="nilscox.dev">
      <PageContextProvider context={{ theme, ...pageContext }}>
        <Layout>
          <Page {...pageProps} />
        </Layout>
      </PageContextProvider>
    </Document>
  );

  const documentHtml = escapeInject`<!DOCTYPE html>${dangerouslySkipEscape(html)}`;

  return {
    documentHtml,
    pageContext: {
      theme,
    },
  };
}

const cookies = (pageContext: PageContextServer) => {
  const cookieHeader = pageContext.headers['cookie'];
  const cookies: Record<string, string> = {};

  if (!cookieHeader) {
    return cookies;
  }

  for (const part of cookieHeader.split(';')) {
    const index = part.indexOf('=');

    if (index < 0) {
      continue;
    }

    cookies[part.slice(0, index).trim()] = part.slice(index + 1).trim();
  }

  return cookies;
};

const getTheme = (pageContext: PageContextServer) => {
  const { theme } = cookies(pageContext);

  if (isTheme(theme)) {
    return theme;
  }
};

type DocumentProps = {
  title: string;
  theme?: Theme;
  children: React.ReactNode;
};

const Document = ({ title, theme, children }: DocumentProps) => (
  <html lang="fr" className={theme === Theme.dark ? 'dark' : undefined}>
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
