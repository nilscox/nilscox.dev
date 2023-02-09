import { RenderErrorPage } from 'vite-plugin-ssr';

export const notFound = (message: string) => {
  throw RenderErrorPage({
    pageContext: {
      pageProps: {
        error: message,
      },
    },
  });
};
