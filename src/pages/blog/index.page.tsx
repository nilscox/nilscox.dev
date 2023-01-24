import { format } from 'date-fns';

export type Post = {
  link: string;
  title: string;
  date: Date;
  cover?: string;
  description?: string;
};

type BlogPageProps = {
  posts: Post[];
};

export const Page = ({ posts }: BlogPageProps) => (
  <div className="mx-auto max-w-page py-6">
    <p>
      So I like sharing, especially <strong>sharing knowledge</strong>. In my blog, you'll find some articles
      about the subjects that I care about, like developer experience or good practices. Some are in french,
      some are in english, if you think that some of them should be translated, let me know. 👌
    </p>

    <p>
      I started writing articles not long ago, so it's a bit empty for now. Come back soon, there should be
      new content added regularly!
    </p>

    <ul className="my-6 divide-y">
      {posts.map((post) => (
        <li key={post.link}>
          <a href={post.link} className="row gap-4 py-4 text-inherit">
            <img
              src={post.cover ?? 'https://via.placeholder.com/96'}
              // eslint-disable-next-line tailwindcss/no-arbitrary-value
              className="h-[6rem] w-[6rem] rounded object-cover"
              alt="article cover"
            />
            <div className="flex-1">
              <p className="my-0 text-lg">{post.title}</p>
              <p
                // eslint-disable-next-line tailwindcss/no-arbitrary-value
                className="my-0 max-w-[32rem] text-muted"
              >
                {post.description}
              </p>
            </div>
            <div className="text-sm text-muted">{format(post.date, 'MMMM do, yyyy')}</div>
          </a>
        </li>
      ))}
    </ul>
  </div>
);
