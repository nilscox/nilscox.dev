import { EvaluateOptions, evaluateSync } from '@mdx-js/mdx';
import React, { ComponentType, useEffect, useMemo, useState } from 'react';
import * as jsxRuntime from 'react/jsx-runtime';

import './post.css';

type BlogPageProps = {
  postId: string;
  post: string;
};

export const Page = ({ post }: BlogPageProps) => {
  const Post = useMemo(() => evaluate(post), [post]);

  const [HtmlPreview, setHtmlPreview] = useState<ComponentType<any>>(() => LoadingHtml);
  const [ReactPreview, setReactPreview] = useState<ComponentType<any>>(() => LoadingCode);

  useEffect(() => {
    setHtmlPreview(() => React.lazy(() => import('../../components/html-preview')));
    setReactPreview(() => React.lazy(() => import('../../components/react-preview')));
  }, []);

  return (
    <main className="post mx-auto max-w-page">
      <React.Suspense fallback={<Loading />}>
        <Post components={{ HtmlPreview, ReactPreview }} />
      </React.Suspense>
    </main>
  );
};

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
  } as EvaluateOptions).default;
};
