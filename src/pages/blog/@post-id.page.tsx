import { EvaluateOptions, evaluateSync } from '@mdx-js/mdx';
import React, { ComponentType, useEffect, useMemo, useState } from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import rehypeHighlight from 'rehype-highlight';

import { Code } from '../../components/code';
import { Theme, useThemeMode } from '../../hooks/use-theme-mode';
import { rehypeCodeMeta } from './unst-plugins/rehype-code-meta';
import { Post } from './post';

import './post.css';

type BlogPageProps = {
  post: Post;
};

export const Page = ({ post }: BlogPageProps) => {
  const Post = useMemo(() => evaluate(post.content), [post]);

  const [HtmlPreview, setHtmlPreview] = useState<ComponentType<any>>(() => LoadingHtml);
  const [ReactPreview, setReactPreview] = useState<ComponentType<any>>(() => LoadingCode);

  useEffect(() => {
    setHtmlPreview(() => React.lazy(() => import('../../components/html-preview')));
    setReactPreview(() => React.lazy(() => import('../../components/react-preview')));
  }, []);

  const cssTheme = useThemeMode() === Theme.light ? 'github' : 'github-dark';

  return (
    <main className="post mx-auto max-w-page">
      <link
        type="text/css"
        rel="stylesheet"
        href={`//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/${cssTheme}.min.css`}
      />

      <React.Suspense fallback={<Loading />}>
        <Post
          components={{
            pre: Code,
            SideBySide,
            HtmlPreview,
            ReactPreview,
          }}
        />
      </React.Suspense>
    </main>
  );
};

type SideBySideProps = {
  left: React.ReactNode;
  right: React.ReactNode;
};

const SideBySide = ({ left, right }: SideBySideProps) => (
  <div className="row">
    <div className="flex-1">{left}</div>
    <div className="flex-1">{right}</div>
  </div>
);

const LoadingHtml = ({ html }: { html: string }) => {
  return <LoadingCode code={html} />;
};

const LoadingCode = ({ code }: { code: string }) => (
  <pre className="relative rounded-sm bg-muted/50 p-2 text-sm">
    {code.trim()}
    <div className="absolute inset-0 animate-pulse bg-neutral/50" />
    <div className="absolute inset-0 flex items-center justify-center text-base">Loading preview...</div>
  </pre>
);

const Loading = () => {
  return <>Loading...</>;
};

const evaluate = (mdx: string) => {
  return evaluateSync(mdx, {
    ...jsxRuntime,
    jsxDEV: jsxRuntime.jsx,
    rehypePlugins: [rehypeHighlight, rehypeCodeMeta],
  } as EvaluateOptions).default;
};
