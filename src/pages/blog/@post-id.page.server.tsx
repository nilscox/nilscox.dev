import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import { PageContextServer } from '../../renderer/types';

export const onBeforeRender = async (pageContext: PageContextServer) => {
  const postId = pageContext.routeParams['post-id'];
  const post = await fetchPost();

  return {
    pageContext: {
      header: { text: "nilscox's blog", link: '/blog' },
      pageProps: {
        postId,
        post,
      },
    },
  };
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const fetchPost = async () => {
  return String(await fs.readFile(__dirname + '/post.mdx'));
};
