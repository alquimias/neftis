'use client';

import { useId, useState, type FormEvent } from 'react';
import { Button } from '#components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '#components/ui/field';
import { Input } from '#components/ui/input';
import { AuthLink, AuthPanel, emailError } from '#components/auth/auth-panel';

// ---------------------------------------------------------------------------
// Account screen. Same frame as Login. Name, email, and password stay quiet
// until submit. loginHref (default /login) is the way back.
// ---------------------------------------------------------------------------

export interface RegisterValues {
  name: string;
  email: string;
  password: string;
}

export function RegisterPage({
  brand,
  loginHref = '/login',
  aside = 'The workspace starts with this account.',
  pending = false,
  className,
  onSubmit,
}: {
  /** Wordmark on the quiet panel. The first letter becomes the mark. */
  brand?: string;
  /** Where "Sign in" goes. */
  loginHref?: string;
  /** The line at the bottom of the quiet panel. */
  aside?: string;
  /** Disables the fields and shows the button spinner. */
  pending?: boolean;
  className?: string;
  /** Called with the trimmed name and email once every field passes. */
  onSubmit?: (values: RegisterValues) => void;
}) {
  const id = useId();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameMessage, setNameMessage] = useState<string | null>(null);
  const [emailMessage, setEmailMessage] = useState<string | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const nextName = name.trim() ? null : 'Enter your name.';
    const nextEmail = emailError(email);
    const nextPassword = password ? null : 'Enter a password.';
    setNameMessage(nextName);
    setEmailMessage(nextEmail);
    setPasswordMessage(nextPassword);
    if (nextName || nextEmail || nextPassword) return;
    onSubmit?.({ name: name.trim(), email: email.trim(), password });
  }

  return (
    <AuthPanel
      title="Create an account"
      description="Start with your name and an email."
      brand={brand}
      aside={aside}
      className={className}
      footer={
        <>
          Already have an account? <AuthLink href={loginHref}>Sign in</AuthLink>
        </>
      }
    >
      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
        <FieldGroup>
          <Field data-invalid={nameMessage ? true : undefined}>
            <FieldLabel htmlFor={`${id}-name`}>Name</FieldLabel>
            <Input
              id={`${id}-name`}
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              disabled={pending}
              aria-invalid={nameMessage ? true : undefined}
              onChange={(event) => {
                setName(event.target.value);
                setNameMessage(null);
              }}
            />
            <FieldError>{nameMessage}</FieldError>
          </Field>
          <Field data-invalid={emailMessage ? true : undefined}>
            <FieldLabel htmlFor={`${id}-email`}>Email</FieldLabel>
            <Input
              id={`${id}-email`}
              name="email"
              type="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              value={email}
              disabled={pending}
              aria-invalid={emailMessage ? true : undefined}
              onChange={(event) => {
                setEmail(event.target.value);
                setEmailMessage(null);
              }}
            />
            <FieldError>{emailMessage}</FieldError>
          </Field>
          <Field data-invalid={passwordMessage ? true : undefined}>
            <FieldLabel htmlFor={`${id}-password`}>Password</FieldLabel>
            <Input
              id={`${id}-password`}
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              disabled={pending}
              aria-invalid={passwordMessage ? true : undefined}
              onChange={(event) => {
                setPassword(event.target.value);
                setPasswordMessage(null);
              }}
            />
            <FieldError>{passwordMessage}</FieldError>
          </Field>
        </FieldGroup>
        <Button type="submit" className="w-full" loading={pending} disabled={pending}>
          Create account
        </Button>
      </form>
    </AuthPanel>
  );
}
