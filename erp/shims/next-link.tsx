import type { AnchorHTMLAttributes, ReactNode } from 'react';

type Href = string | { pathname?: string };

type NextLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: Href;
  children?: ReactNode;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  legacyBehavior?: boolean;
};

/** Vite apps have no Next router. The registry cards use this as a plain anchor. */
export default function NextLink({
  href,
  prefetch: _prefetch,
  replace: _replace,
  scroll: _scroll,
  shallow: _shallow,
  passHref: _passHref,
  legacyBehavior: _legacy,
  ...props
}: NextLinkProps) {
  const url = typeof href === 'string' ? href : (href.pathname ?? '#');
  return <a href={url} {...props} />;
}
