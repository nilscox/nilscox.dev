import clsx from 'clsx';

import * as icons from '../icons';

type ToolProps = {
  label: string;
  icon: React.ReactNode;
  size?: 'big';
};

const Tool = ({ label, icon }: ToolProps) => (
  <div className="col items-center gap-2">
    {icon}
    <code className="text-sm text-muted">{label}</code>
  </div>
);

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

Tool.factory =
  (label: string, color: string, Icon: IconType) =>
  ({ size, ...props }: Omit<ToolProps, 'icon' | 'label'>) => {
    return (
      <Tool
        label={label}
        icon={
          <Icon
            fill="currentColor"
            className={clsx('dark:fill-yellow', size === 'big' && 'w-8')}
            style={{ color }}
          />
        }
        {...props}
      />
    );
  };

const { colors } = icons;

export const Eslint = Tool.factory('eslint', colors.eslint, icons.Eslint);
export const Express = Tool.factory('Express', colors.express, icons.Express);
export const GitHub = Tool.factory('GitHub', colors.github, icons.Github);
export const Koyeb = Tool.factory('Koyeb', colors.koyeb, icons.Koyeb);
export const Kubernetes = Tool.factory('Kubernetes', colors.kubernetes, icons.Kubernetes);
export const Matomo = Tool.factory('Matomo', colors.matomo, icons.Matomo);
export const Mocha = Tool.factory('Mocha', colors.mocha, icons.Mocha);
export const NestJS = Tool.factory('NestJS', colors.nestjs, icons.Nestjs);
export const NextJS = Tool.factory('NextJS', colors.next, icons.Nextdotjs);
export const NodeJS = Tool.factory('NodeJS', colors.node, icons.Nodedotjs);
export const Playwright = Tool.factory('Playwright', colors.playwright, icons.Playwright);
export const Pnpm = Tool.factory('pnpm', colors.pnpm, icons.Pnpm);
export const PostgreSQL = Tool.factory('PostgreSQL', colors.postgresql, icons.Postgresql);
export const ReactHookForm = Tool.factory('ReactHookForm', colors.reactHookForm, icons.Reacthookform);
export const ReactJS = Tool.factory('React', colors.react, icons.React);
export const ReactQuery = Tool.factory('ReactQuery', colors.reactQuery, icons.Reactquery);
export const Redux = Tool.factory('Redux', colors.redux, icons.Redux);
export const SQLite = Tool.factory('SQLite', colors.sqlite, icons.Sqlite);
export const Tailwind = Tool.factory('Tailwind', colors.tailwindcss, icons.Tailwindcss);
export const TypeScript = Tool.factory('TypeScript', colors.typescript, icons.Typescript);
export const Vite = Tool.factory('Vite', colors.vite, icons.Vite);
export const Webpack = Tool.factory('Webpack', colors.webpack, icons.Webpack);
