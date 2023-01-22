import * as icons from '@icons-pack/react-simple-icons';

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

Tool.factory = (label: string, Icon: icons.IconType) => (props: Omit<ToolProps, 'icon' | 'label'>) => {
  return <Tool label={label} icon={<Icon color="default" size={props.size === 'big' ? 56 : undefined} />} {...props} />;
};

export const TypeScript = Tool.factory('TypeScript', icons.Typescript);
export const NodeJS = Tool.factory('NodeJS', icons.Nodedotjs);
export const Express = Tool.factory('Express', icons.Express);
export const React = Tool.factory('React', icons.ReactJs);
export const NextJS = Tool.factory('NextJS', icons.Nextdotjs);
export const GitHub = Tool.factory('GitHub', icons.Github);
export const PostgreSQL = Tool.factory('PostgreSQL', icons.Postgresql);
export const Playwright = Tool.factory('Playwright', icons.Playwright);
export const Mocha = Tool.factory('Mocha', icons.Mocha);
export const Tailwind = Tool.factory('Tailwind', icons.Tailwindcss);
export const Kubernetes = Tool.factory('Kubernetes', icons.Kubernetes);
export const Redux = Tool.factory('Redux', icons.Redux);
export const SQLite = Tool.factory('SQLite', icons.Sqlite);
export const Eslint = Tool.factory('eslint', icons.Eslint);
export const Pnpm = Tool.factory('pnpm', icons.Pnpm);
export const Matomo = Tool.factory('Matomo', icons.Matomo);
export const Vite = Tool.factory('Vite', icons.Vite);
export const Webpack = Tool.factory('Webpack', icons.Webpack);
export const ReactHookForm = Tool.factory('ReactHookForm', icons.Reacthookform);
export const ReactQuery = Tool.factory('ReactQuery', icons.Reactquery);
export const Koyeb = Tool.factory('Koyeb', icons.Koyeb);
