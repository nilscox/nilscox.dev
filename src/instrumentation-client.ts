declare global {
  interface Window {
    _paq: unknown[];
  }
}

function initMatomo(baseUrl?: string, siteId?: string) {
  if (!baseUrl || !siteId) {
    return;
  }

  const _paq = (window._paq = window._paq || []);

  _paq.push(['trackPageView']);
  _paq.push(['setTrackerUrl', `${baseUrl}/matomo.php`]);
  _paq.push(['setSiteId', siteId]);

  const script = document.createElement('script');

  script.async = true;
  script.src = `${baseUrl}/matomo.js`;

  document.body.appendChild(script);
}

initMatomo(process.env.NEXT_PUBLIC_MATOMO_URL, process.env.NEXT_PUBLIC_MATOMO_SITE_ID);

export {};
