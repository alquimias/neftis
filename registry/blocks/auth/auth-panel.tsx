'use client';

import type { ReactNode } from 'react';
import { cn } from '#lib/utils';
import { fontWeights } from '#lib/font-weight';
import { useShape } from '#lib/shape-context';
import { typeClass } from '#lib/size-context';

// ---------------------------------------------------------------------------
// The frame both auth screens share. The form sits in the first column.
// Once the page itself is wide enough (@xl on this element, not the
// viewport), a muted panel takes the trailing two fifths: a mark and one
// line. Below that width the form is the whole screen.
// ---------------------------------------------------------------------------

/** One @, and a dot in the domain. Shared so Login and Register disagree
 *  about an address in the same way. */
export function emailError(value: string): string | null {
  const email = value.trim();
  if (!email) return 'Enter an email address.';
  const at = email.indexOf('@');
  if (at <= 0 || !email.slice(at + 1).includes('.')) return 'Enter a valid email address.';
  return null;
}

export function AuthLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="text-foreground underline-offset-4 transition-colors duration-80 hover:underline"
      style={{ fontVariationSettings: fontWeights.semibold }}
    >
      {children}
    </a>
  );
}

export function AuthPanel({
  title,
  description,
  brand = 'Acme',
  aside,
  children,
  footer,
  className,
}: {
  title: string;
  description: string;
  /** The word whose first letter becomes the mark. Replace the mark in this
   *  file to use your own logo. */
  brand?: string;
  aside: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  const shape = useShape();
  const initial = brand.trim().slice(0, 1).toUpperCase();

  return (
    <div className={cn('@container flex h-full min-h-svh w-full bg-background', className)}>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
        <div className="m-auto flex w-full max-w-sm flex-col gap-8 px-6 py-12">
          <div className="flex flex-col gap-2">
            <h1
              className={cn(typeClass('display'), 'text-foreground')}
              style={{ fontVariationSettings: fontWeights.semibold }}
            >
              {title}
            </h1>
            <p className={cn(typeClass('body'), 'text-muted-foreground')}>{description}</p>
          </div>
          {children}
          {footer ? (
            <p className={cn(typeClass('body'), 'text-muted-foreground')}>{footer}</p>
          ) : null}
        </div>
      </div>
      <aside className="hidden w-2/5 shrink-0 flex-col justify-between border-l border-border bg-muted p-8 @xl:flex">
        <div
          aria-hidden
          className={cn(
            'flex size-10 items-center justify-center bg-foreground text-background select-none',
            shape.button,
            typeClass('subtitle'),
          )}
          style={{ fontVariationSettings: fontWeights.semibold }}
        >
          {initial}
        </div>
        <p
          className={cn(typeClass('title'), 'max-w-xs text-foreground')}
          style={{ fontVariationSettings: fontWeights.semibold }}
        >
          {aside}
        </p>
      </aside>
    </div>
  );
}
