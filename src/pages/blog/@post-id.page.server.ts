import { NotionAPI } from 'notion-client';

import { PageContextServer } from '../../renderer/types';

export const onBeforeRender = async (pageContext: PageContextServer) => {
  const postId = pageContext.routeParams['post-id'];

  const notion = new NotionAPI();
  const recordMap = await notion.getPage(postId);

  return {
    pageContext: {
      header: { text: "nilscox's blog", link: '/blog' },
      pageProps: {
        recordMap,
      },
    },
  };
};
