import { Client, isFullPage } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { isAfter } from 'date-fns';

import { Post } from './index.page';

const getLink = (page: PageObjectResponse) => {
  return page.url.replace('https://www.notion.so', '/blog');
};

const getDate = (page: PageObjectResponse) => {
  const block = page.properties['Publication date'];

  if (block.type !== 'date') {
    throw new Error('expected Publication date to be of type "date"');
  }

  return new Date(block.date?.start ?? '');
};

const getTitle = (page: PageObjectResponse) => {
  const block = page.properties.Nom;

  if (block.type !== 'title') {
    return '';
  }

  return block.title[0].plain_text;
};

const getCover = (page: PageObjectResponse) => {
  if (!page.cover) {
    return;
  }

  if (page.cover.type === 'external') {
    return page.cover.external.url;
  }

  return page.cover.file.url;
};

const getDescription = (page: PageObjectResponse) => {
  const block = page.properties.Description;

  if (block.type !== 'rich_text') {
    return;
  }

  return block.rich_text[0]?.plain_text;
};

const listPosts = async (): Promise<Post[]> => {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });

  const response = await notion.databases.query({
    database_id: '120e81193d234660b8acc324db934a8a',
    sorts: [{ property: 'Publication date', direction: 'descending' }],
  });

  const now = new Date();

  return response.results
    .map((result): Post => {
      if (!isFullPage(result)) {
        throw new Error('expected isFullPage(result) to be true');
      }

      return {
        link: getLink(result),
        title: getTitle(result),
        date: getDate(result),
        cover: getCover(result),
        description: getDescription(result),
      };
    })
    .filter((post) => isAfter(now, post.date));
};

export const onBeforeRender = async () => ({
  pageContext: {
    header: { text: "nilscox's blog", link: '/blog' },
    pageProps: {
      posts: await listPosts(),
    },
  },
});
