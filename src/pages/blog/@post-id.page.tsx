import { lazy, Suspense } from 'react';
import { NotionRenderer } from 'react-notion-x';

import { Theme, useThemeMode } from '../../hooks/use-theme-mode';

import 'prismjs/themes/prism-tomorrow.css';
import 'react-notion-x/src/styles.css';

import './notion.css';

// prettier-ignore
const components = {
  Code: lazy(() => import('react-notion-x/build/third-party/code').then(({ Code }) => ({ default: Code }))),
  Collection: lazy(() => import('react-notion-x/build/third-party/collection').then(({ Collection }) => ({ default: Collection }))),
}

type BlogPostPageProps = Pick<React.ComponentProps<typeof NotionRenderer>, 'recordMap'>;

export const Page = ({ recordMap }: BlogPostPageProps) => {
  const theme = useThemeMode();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotionRenderer
        components={components}
        recordMap={recordMap}
        disableHeader
        fullPage
        darkMode={theme === Theme.dark}
      />
    </Suspense>
  );
};
