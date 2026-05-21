// Import global styles and fonts
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function GlobalNotFound() {
  return (
    <html style={{ height: '100%' }}>
      <body
        style={{
          height: '100%',
          background: 'black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src="https://http.cat/404" />
      </body>
    </html>
  );
}
