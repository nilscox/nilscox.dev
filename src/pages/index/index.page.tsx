import * as tools from '../../components/tools';
import { ToolsSlider } from '../../components/tools-slider';

import photo from './photo.jpg';

export const Page = () => (
  <>
    <Header />

    <div className="col my-4 mx-auto max-w-page gap-4 px-4 md:my-8">
      <Intro />
      <Stack />
      <AboutMe />
      <Hiring />
    </div>
  </>
);

/* eslint-disable tailwindcss/no-arbitrary-value */

const Header = () => (
  <header className="bg-yellow dark:bg-muted md:-mt-6">
    <h1 className="col md:row row h-[24rem] items-center justify-center px-4 md:gap-4">
      <img src={photo} width={144} height={144} className="rounded-lg" alt="my face" />
      <p className="max-w-[24rem] text-xl">
        Hi! I'm <span className="font-semibold text-[#8a2626] dark:text-[#FFFFFF]">nilscox</span>, yet another
        web developer.
      </p>
    </h1>
  </header>
);

/* eslint-enable tailwindcss/no-arbitrary-value */

type SectionProps = {
  title: React.ReactNode;
  children: React.ReactNode;
};

const Section = ({ title, children }: SectionProps) => (
  <div className="p-2">
    <div className="text-right font-semibold uppercase text-muted">{title}</div>
    {children}
  </div>
);

const Intro = () => (
  <div className="my-4 text-lg md:my-8">
    <p>My real name is Nils, I'm a passionate developer for more than 10 years.</p>
    <p>
      I make <strong>web applications</strong>, both for fun and for a living, and I deeply care about making
      things right. I currently work as a frontend engineer at <a href="https://koyeb.com">koyeb</a>.
    </p>
  </div>
);

const Stack = () => (
  <Section title="The stack I ♥️ to use">
    <ToolsSlider>
      <tools.ReactHookForm size="big" />
      <tools.Express size="big" />
      <tools.Eslint size="big" />
      <tools.Mocha size="big" />
      <tools.GitHub size="big" />
      <tools.PostgreSQL size="big" />
      <tools.TypeScript size="big" />
      <tools.Tailwind size="big" />
      <tools.NodeJS size="big" />
      <tools.Vite size="big" />
      <tools.React size="big" />
      <tools.Pnpm size="big" />
      <tools.Redux size="big" />
      <tools.Webpack size="big" />
      <tools.Kubernetes size="big" />
      <tools.ReactQuery size="big" />
      <tools.SQLite size="big" />
      <tools.Playwright size="big" />
      <tools.NextJS size="big" />
      <tools.Matomo size="big" />
      <tools.Koyeb size="big" />
    </ToolsSlider>
  </Section>
);

const AboutMe = () => (
  <Section title="About me">
    <p>So you want to know a bit more about me? Sure! What can I tell you...?</p>

    <p>
      I come from Le Havre (France), I went to <a href="https://epita.fr">EPITA</a> an engineering school in
      Paris, and I worked as a full-stack web developer for several startups. Throughout my different
      experiences, I acquired the skills I use today to build apps, from understanding the needs to deploying
      and maintaining a technical solution.
    </p>

    <p>
      What do I mean by "making things right", you ask? Well, a lot actually... In short, I always do my best
      to build resilient, unit-tested systems, and I spend a lot of time learning about what I believe are{' '}
      <strong>good practices</strong> (clean code, clean architecture, microservices, test-driven development,
      domain-driven design, SOLID principles, etc.) in order to keep <strong>high quality standards</strong>{' '}
      while being pragmatic in my decision making process.
    </p>

    <p>
      Apart from coding, I also{' '}
      <a href="https://soundcloud.com/brainwave-1" className="text-inherit hover:underline">
        make music
      </a>
      , beer, I do a bit of slackline and stuff that regular people do, like playing video games and watching
      tv shows. But I spend most of my free time coding on my side projects.
    </p>
  </Section>
);

const Hiring = () => (
  <Section title="Hiring?">
    <p>You want to work with me?! Whoop-de-doo! Amazing!</p>

    <p>
      To be honest, I'm not looking for a new opportunity at the moment, but I may know a few people who are!
      Let's <a href="/contact">get it touch</a> and we can discuss it. <span title="handshake">🤝</span>
    </p>
  </Section>
);
