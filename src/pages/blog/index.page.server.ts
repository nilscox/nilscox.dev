import path from 'path';
import { fileURLToPath } from 'url';
import { isAfter } from 'date-fns';

import { Post } from './post';
import { FileSystemPostRepository } from './file-system-post.repository';

export const onBeforeRender = async () => ({
  pageContext: {
    header: { text: "nilscox's blog", link: '/blog' },
    pageProps: {
      posts: await listPosts(),
    },
  },
});

const listPosts = async (): Promise<Post[]> => {
  const now = new Date();
  const repository = new FileSystemPostRepository();
  const posts = await repository.listPosts();

  return posts.filter((post) => isAfter(now, post.date));
};
