import Moon from '@heroicons/react/24/solid/MoonIcon';
import Sun from '@heroicons/react/24/solid/SunIcon';
import clsx from 'clsx';

import { useHeader, usePathname } from './renderer/page-context';

import '@fontsource/source-sans-3/variable.css';
import './index.css';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

type NavLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  strict?: boolean;
};

const NavLink = ({ strict, className, children, ...props }: NavLinkProps) => {
  const pathname = usePathname();
  const active = strict ? pathname === props.href : pathname?.startsWith(props.href ?? '');

  return (
    <a className={clsx(active && 'border-b-2 border-inverted/50', className)} {...props}>
      {children}
    </a>
  );
};

const Header = () => {
  const header = useHeader();

  return (
    <header className="sticky top-0 z-10 w-full bg-yellow dark:bg-muted">
      <div className="row mx-auto max-w-page items-center px-4 py-2 font-semibold">
        {header && (
          <a href={header.link} className="hidden flex-1 sm:block">
            {header.text}
          </a>
        )}
        <Navigation />
      </div>
    </header>
  );
};

const Navigation = () => (
  <nav className="row ml-auto flex-1 justify-between gap-6 sm:flex-none">
    <NavLink href="/" strict>
      Home
    </NavLink>

    <NavLink href="/cv" rel="external">
      CV
    </NavLink>

    <NavLink href="/blog">Blog</NavLink>

    <NavLink href="https://www.github.com/nilscox" rel="external">
      GitHub
    </NavLink>

    <NavLink href="https://www.linkedin.com/in/nilscox" rel="external">
      LinkedIn
    </NavLink>

    <ToggleDarkMode />
  </nav>
);

const ToggleDarkMode = () => (
  <button
    type="button"
    className="row items-start p-0 pt-1"
    title="Toggle dark mode"
    onClick={() => {
      document.body.parentElement?.classList.toggle('dark');
    }}
  >
    <Moon className="w-4 dark:hidden" />
    <Sun className="hidden w-4 dark:block" />
  </button>
);

const Footer = () => {
  return <footer className="mx-auto my-8 max-w-page text-center">FOOTER</footer>;
};
