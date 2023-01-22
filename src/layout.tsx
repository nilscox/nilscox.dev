import { HiMoon } from 'react-icons/hi';
import clsx from 'clsx';

import '@fontsource/source-sans-3/variable.css';

import './index.css';
import { usePathname } from './renderer/page-context';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => (
  <>
    <Navigation />
    {children}
  </>
);

type NavLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  strict?: boolean;
};

const NavLink = ({ strict, className, ...props }: NavLinkProps) => {
  const pathname = usePathname();
  const active = strict ? pathname === props.href : pathname?.startsWith(props.href ?? '');

  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a className={clsx(active && 'border-b-2 border-inverted/50', className)} {...props} />;
};

const Navigation = () => (
  <div className="sticky top-0 z-10 w-full bg-yellow dark:bg-muted">
    <nav className="row mx-auto max-w-page justify-between gap-6 px-4 py-2 font-semibold sm:justify-end">
      <NavLink href="/" strict>
        Home
      </NavLink>
      <NavLink href="/cv">CV</NavLink>
      <NavLink href="/blog">Blog</NavLink>
      <NavLink href="https://www.linkedin.com/in/nilscox">LinkedIn</NavLink>
      <ToggleDarkMode />
    </nav>
  </div>
);

const ToggleDarkMode = () => (
  <button
    type="button"
    className="row items-start p-0 pt-1"
    onClick={() => {
      document.body.parentElement?.classList.toggle('dark');
    }}
  >
    <HiMoon />
  </button>
);
