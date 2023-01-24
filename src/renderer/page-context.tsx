import React, { useContext } from 'react';

import { Theme } from '../hooks/use-theme-mode';

import { PageContextClient } from './types';

type PageContext = Pick<PageContextClient, 'urlPathname' | 'header'> & {
  theme?: Theme;
};

const pageContext = React.createContext<PageContext>({});

type PageContextProviderProps = {
  context: PageContext;
  children: React.ReactNode;
};

export const PageContextProvider = ({ context, children }: PageContextProviderProps) => (
  <pageContext.Provider value={context}>{children}</pageContext.Provider>
);

const usePageContext = () => {
  return useContext(pageContext);
};

export const usePathname = () => {
  return usePageContext().urlPathname;
};

export const useInitialTheme = () => {
  return usePageContext().theme;
};

export const useHeader = () => {
  return usePageContext().header;
};
