'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  Button as NeftisButton,
  buttonVariants,
  type ButtonSize as NeftisButtonSize,
} from '../../../registry/radix/button';
import type { IconComponent } from '../../../registry/default/lib/icon-context';
import { cn } from '../../lib/utils';
import { UiLink } from '../../link';

type LegacyVariant = 'default' | 'outline' | 'link' | 'iconReveal';
type CanonicalVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive';

const legacyVariantAliases: Record<LegacyVariant, CanonicalVariant> = {
  default: 'primary',
  outline: 'tertiary',
  link: 'ghost',
  iconReveal: 'primary',
};

export type ButtonVariant = CanonicalVariant | LegacyVariant;
export type ButtonSize = NeftisButtonSize | 'xs';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  loading?: boolean;
  leadingIcon?: IconComponent;
  trailingIcon?: IconComponent;
  active?: boolean;
  to?: string;
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
  arrow?: boolean;
}

function resolveVariant(variant: ButtonVariant | undefined): CanonicalVariant {
  if (!variant) return 'primary';
  if (variant in legacyVariantAliases) return legacyVariantAliases[variant as LegacyVariant];
  return variant as CanonicalVariant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant,
    size,
    asChild,
    loading,
    leadingIcon,
    trailingIcon,
    active,
    to,
    icon,
    iconPosition = 'end',
    arrow,
    children,
    className,
    type = 'button',
    ...rest
  },
  ref,
) {
  const resolvedVariant = resolveVariant(variant);
  const resolvedSize = size === 'xs' ? 'compact' : size;
  const isLinkVariant = variant === 'link';
  const isIconOnly =
    resolvedSize === 'icon' || resolvedSize === 'icon-compact' || size === 'icon-sm';
  const hasOwnIcon = icon != null || leadingIcon != null || trailingIcon != null;
  const showArrow =
    arrow ??
    (resolvedVariant === 'primary' &&
      (resolvedSize == null || resolvedSize === 'default') &&
      !isLinkVariant &&
      !isIconOnly &&
      !hasOwnIcon);

  const resolvedTrailingIcon =
    trailingIcon ?? (showArrow ? (ArrowRight as IconComponent) : undefined);

  // asChild exige un solo elemento anfitrión. Envolverlo en un fragmento hace
  // que la capa de fondo (`absolute inset-px`) se ancle al ancestro posicionado
  // más cercano y tape la página.
  if (asChild) {
    return (
      <NeftisButton
        ref={ref}
        variant={resolvedVariant}
        size={resolvedSize}
        asChild
        loading={loading}
        leadingIcon={leadingIcon}
        trailingIcon={resolvedTrailingIcon}
        active={active}
        className={cn(isLinkVariant && 'underline-offset-4 hover:underline', className)}
        {...rest}
      >
        {children}
      </NeftisButton>
    );
  }

  const content = (
    <>
      {icon != null && iconPosition === 'start' ? icon : null}
      {children}
      {icon != null && iconPosition === 'end' ? icon : null}
    </>
  );

  return (
    <NeftisButton
      ref={ref}
      variant={resolvedVariant}
      size={resolvedSize}
      loading={loading}
      leadingIcon={leadingIcon}
      trailingIcon={resolvedTrailingIcon}
      active={active}
      className={cn(isLinkVariant && 'underline-offset-4 hover:underline', className)}
      type={to ? undefined : type}
      render={to ? <UiLink to={to} /> : undefined}
      {...rest}
    >
      {content}
    </NeftisButton>
  );
});

export { buttonVariants };
