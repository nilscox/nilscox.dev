import { useEffect, useState } from 'react';

import { useInitialTheme } from '../renderer/page-context';

import { useMutationObserver } from './use-mutation-observer';

const html = typeof window !== 'undefined' ? document.body.parentElement : null;

export enum Theme {
  light = 'light',
  dark = 'dark',
}

export const isTheme = (value: unknown): value is Theme => {
  return Object.values<unknown>(Theme).includes(value);
};

export const useThemeMode = () => {
  const [theme, setTheme] = useState(useInitialTheme() ?? getPreferredTheme);

  useMutationObserver(
    html,
    () => {
      setTheme(html?.classList.contains('dark') ? Theme.dark : Theme.light);
    },
    {
      attributes: true,
      attributeFilter: ['class'],
    }
  );

  return theme;
};

export const getPreferredTheme = () => {
  if (!html) {
    return Theme.light;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.dark : Theme.light;
};

export const StoreTheme = () => {
  const theme = useThemeMode();

  useEffect(() => {
    document.cookie = `theme=${theme}`;
  }, [theme]);

  return null;
};
