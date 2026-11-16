'use client';

import { forwardRef, type ReactNode } from 'react';
import {
  Checkbox as NeftisCheckbox,
  type CheckboxProps as NeftisCheckboxProps,
} from '../../../registry/radix/checkbox';
import { cn } from '../../lib/utils';

export type CheckboxProps = NeftisCheckboxProps & {
  label?: ReactNode;
  labelClassName?: string;
  fieldClassName?: string;
};

export const checkboxLabelClassName = 'text-sm leading-5 text-foreground';

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
  { label, labelClassName, fieldClassName, className, id, ...props },
  ref,
) {
  const control = <NeftisCheckbox ref={ref} id={id} className={className} {...props} />;
  if (label == null) return control;
  return (
    <div className={cn('flex items-start gap-2', fieldClassName)}>
      {control}
      <label htmlFor={id} className={cn(checkboxLabelClassName, labelClassName)}>
        {label}
      </label>
    </div>
  );
});
