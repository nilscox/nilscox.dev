import { isBefore } from 'date-fns';
import { PageContextServer } from '../../renderer/types';
import { FileSystemPostRepository } from './file-system-post.repository';
import { notFound } from '../../renderer/not-found';

export const onBeforeRender = async (pageContext: PageContextServer) => ({
  pageContext: {
    header: { text: "nilscox's blog", link: '/blog' },
    pageProps: {
      post: await getPost(pageContext.routeParams['post-id']),
    },
  },
});

const getPost = async (postId: string) => {
  const now = new Date();
  const repository = new FileSystemPostRepository();
  const post = await repository.getPost(postId);

  if (!post || isBefore(now, post.date)) {
    throw notFound(`Post "${postId}" doesn't exist`);
  }

  return post;
};
