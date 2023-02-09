import { isAfter } from 'date-fns';

import { Post } from './index.page';

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

  return ['/blog/test']
    .map((link): Post => {
      return {
        link,
        title: 'Home page background',
        date: new Date('2023-02-09'),
        cover: '/post.svg',
        description: 'Generate a SVG to be used as an animated background image',
      };
    })
    .filter((post) => isAfter(now, post.date));
};
