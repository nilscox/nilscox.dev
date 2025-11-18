import photo from '../../photo.jpg';
import clsx from 'clsx';
import { intervalToDuration } from 'date-fns';
import { ArrowUpRight, GlobeIcon, MapPinIcon } from 'lucide-react';
import { Roboto_Mono } from 'next/font/google';
import Image from 'next/image';
import { useMemo } from 'react';
import jsx from 'react/jsx-runtime';
import rehypeReact from 'rehype-react';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import data from './cv.json';

import './styles.css';

const robotoMono = Roboto_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export default function Page() {
  return (
    <div
      className={clsx(
        robotoMono.variable,
        'font-mono row max-w-6xl my-4 mx-auto bg-white rounded-lg shadow-2xl',
        'print:max-w-none print:my-0 print:shadow-none',
      )}
    >
      <Aside />
      <Main />
    </div>
  );
}

function Aside() {
  return (
    <aside className="w-64 p-2 bg-gray-200 col gap-12 border-r border-gray-300 print:p-4 print:border-gray-200 rounded-l-lg">
      <section>
        <Image
          src={photo}
          alt="My face"
          width={320}
          className="h-80 object-cover rounded-md"
          style={{ overflowClipMargin: 'unset' }}
        />
      </section>

      <section className="col gap-4">
        <header>
          <h2 className="text-xl text-amber-700 font-medium">{data.labels.contact}</h2>
        </header>

        <div className="col gap-2">
          <p className="text-sm">
            <SocialLink
              icon="https://cdn.simpleicons.org/github?viewbox=auto"
              {...data.contact.social.GitHub}
            />
          </p>

          <p className="text-sm">
            <SocialLink
              icon="https://s.magecdn.com/social/tc-linkedin.svg"
              {...data.contact.social.LinkedIn}
            />
          </p>

          <p className="text-sm">
            <SocialLink icon="https://cdn.simpleicons.org/x?viewbox=auto" {...data.contact.social.Twitter} />
          </p>
        </div>

        <div className="col gap-2">
          <p className="text-sm">
            <GlobeIcon className="size-em inline-block" />{' '}
            <ExternalLink icon={false} href={data.contact.website}>
              {data.contact.website}
            </ExternalLink>
          </p>
          <p className="text-sm">
            <MapPinIcon className="size-em inline-block" /> {data.contact.location}
          </p>
        </div>
      </section>

      <section className="col gap-4">
        <header>
          <h2 className="text-xl text-amber-700 font-medium">{data.labels.skills}</h2>
        </header>

        <ul className="row gap-x-4 gap-y-2 items-center flex-wrap">
          {Object.entries(data.skills).map(([skill, level]) => (
            <li
              key={skill}
              className={clsx({
                'text-xs': level.length === 1,
                'text-sm': level.length === 2,
                'text-base': level.length === 3,
              })}
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <section className="col gap-4">
        <header>
          <h2 className="text-xl text-amber-700 font-medium">{data.labels.languages}</h2>
        </header>

        <ul>
          {Object.entries(data.languages).map(([language, level]) => (
            <li key={language}>
              {language} {level}
            </li>
          ))}
        </ul>
      </section>

      <section className="col gap-4">
        <header>
          <h2 className="text-xl text-amber-700 font-medium">{data.labels.about}</h2>
        </header>

        <div className="col gap-4">
          {data.about.map((fact, index) => (
            <p key={index} className="text-sm">
              {fact}
            </p>
          ))}
        </div>
      </section>
    </aside>
  );
}

function SocialLink({ icon, label, link }: { icon: string; label: string; link: string }) {
  return (
    <a href={link} className="row gap-1 items-center">
      <img src={icon} className="h-4 grayscale" />
      {label}
    </a>
  );
}

function Main() {
  return (
    <main className="flex-1 p-4 col gap-4">
      <header className="items-center col gap-1 my-2">
        <h1 className="text-3xl">
          {data.firstName} {data.lastName}
        </h1>
        <div className="text-dim">{data.jobTitle}</div>
      </header>

      <section className="mx-16">
        <Markdown className="prose-p:mt-0 prose-p:mb-2 prose-p:last-of-type:mb-0">{data.headline}</Markdown>
      </section>

      <Section label={data.labels.jobs} entries={data.experience} />
      <Section label={data.labels.education} entries={data.education} />
      <Section label={data.labels.projects} entries={data.projects} />
    </main>
  );
}

type Entry = {
  name: string;
  date?: string;
  from?: string;
  to?: string;
  company?: { name: string; link: string };
  description?: string[];
  technologies?: string[];
};

function Section({ label, entries }: { label: string; entries: Entry[] }) {
  return (
    <section className="col gap-3">
      <header>
        <h2 className="text-xl text-sky-700 font-medium">{label}</h2>
      </header>

      {entries.map((entry, index) => (
        <SectionEntry key={index} entry={entry} />
      ))}
    </section>
  );
}

function SectionEntry({ entry }: { entry: Entry }) {
  return (
    <div className="row gap-2 mb-2">
      <div className="col items-center">
        <div className="size-2 rounded-full bg-gray-500 mt-1" />
        <div className="border-l flex-1" />
      </div>

      <div className="col gap-1 flex-1">
        <EntryDates {...entry} />

        <div className="row gap-3 items-center">
          <h3 className="font-semibold text-lg">{entry.name}</h3>
          {entry.company && '\u2022'}
          {entry.company && <Company {...entry.company} />}
        </div>

        {entry.description && <Markdown>{entry.description.map((item) => `- ${item}`).join('\n')}</Markdown>}
      </div>

      <EntryTechnologies {...entry} />
    </div>
  );
}

function Company({ link, name }: { link: string; name: string }) {
  return (
    <a href={link} className="text-dim hover:underline">
      {name}
    </a>
  );
}

function EntryDates({ date, from, to }: { date?: string; from?: string; to?: string }) {
  if (date) {
    return <div className="text-xs row gap-2">{date}</div>;
  }

  return (
    <div className="text-xs row gap-2">
      {from} - {to ?? data.labels.present}
      {from && <span className="text-dim">({formatDistance(from, to)})</span>}
    </div>
  );
}

function EntryTechnologies({ technologies }: { technologies?: string[] }) {
  if (!technologies) {
    return <div className="min-w-32" />;
  }

  return (
    <div className="self-start mt-4 border-l pl-4 ml-4 min-w-32 text-sm">
      <ul>
        {technologies.map((technology, index) => (
          <li key={index}>
            <TechnologyIcon technology={technology} />
            {technology}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TechnologyIcon({ technology }: { technology: string }) {
  const image = technologyIconMap[technology.toLowerCase()];

  if (!image) {
    return <div className="inline-block me-1 size-em" />;
  }

  return <img src={image} className="inline-block me-1 size-em" />;
}

const technologyIconMap: Record<string, string> = {
  typescript: 'https://cdn.simpleicons.org/typescript/gray?viewbox=auto',
  tailwind: 'https://cdn.simpleicons.org/tailwindcss/gray?viewbox=auto',
  react: 'https://cdn.simpleicons.org/react/gray?viewbox=auto',
  nextjs: 'https://cdn.simpleicons.org/nextdotjs/gray?viewbox=auto',
  github: 'https://cdn.simpleicons.org/github/gray?viewbox=auto',
  nestjs: 'https://cdn.simpleicons.org/nestjs/gray?viewbox=auto',
  postgresql: 'https://cdn.simpleicons.org/postgresql/gray?viewbox=auto',
  redux: 'https://cdn.simpleicons.org/redux/gray?viewbox=auto',
  loopback: 'https://cdn.simpleicons.org/loopback/gray?viewbox=auto',
  nodejs: 'https://cdn.simpleicons.org/nodedotjs/gray?viewbox=auto',
  koyeb: 'https://cdn.simpleicons.org/koyeb/gray?viewbox=auto',
  solidjs: 'https://cdn.simpleicons.org/solid/gray?viewbox=auto',
  express: 'https://cdn.simpleicons.org/express/gray?viewbox=auto',
};

function formatDistance(start: Date | string, end: Date | string = new Date()) {
  const { years = 0, months = 0 } = intervalToDuration({ start, end });
  let result = `${years} ans`;

  if (months > 0) {
    result += `, ${months} mois`;
  }

  return result;
}

function Markdown({ className, children }: { className?: string; children: string }) {
  const { result } = useMemo(() => {
    return unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeReact, { ...jsx, components })
      .processSync(children);
  }, [children]);

  return (
    <div
      className={clsx(
        'prose max-w-none text-sm',
        'prose-a:text-inherit',
        'prose-li:first-of-type:mt-0! prose-li:last-of-type:mb-0! prose-li:pl-0!',
        className,
      )}
    >
      {result}
    </div>
  );
}

const components = {
  a: ExternalLink,
};

function ExternalLink({ icon = true, children, ...props }: React.ComponentProps<'a'> & { icon?: boolean }) {
  return (
    <a {...props} target="_blank" rel="noreferrer noopener">
      {children}
      {icon && <ArrowUpRight className="size-em inline-block print:hidden" />}
    </a>
  );
}
