'use client';

import { useId, useState, type FormEvent } from 'react';
import { Button } from '#components/ui/button';
import { Checkbox } from '#components/ui/checkbox';
import { Field, FieldError, FieldGroup, FieldLabel } from '#components/ui/field';
import { Input } from '#components/ui/input';
import { AuthLink, AuthPanel, emailError } from '#components/auth/auth-panel';

// ---------------------------------------------------------------------------
// Sign-in screen. Fields stay quiet until submit, then each message sits
// under its own control. Pair it with RegisterPage. registerHref (default
// /register) is the link between them.
// ---------------------------------------------------------------------------

export interface LoginValues {
  email: string;
  password: string;
  remember: boolean;
}

export function LoginPage({
  brand,
  registerHref = '/register',
  aside = 'Pick up the workspace where you left it.',
  pending = false,
  className,
  onSubmit,
}: {
  /** Wordmark on the quiet panel. The first letter becomes the mark. */
  brand?: string;
  /** Where "Create an account" goes. */
  registerHref?: string;
  /** The line at the bottom of the quiet panel. */
  aside?: string;
  /** Disables the fields and shows the button spinner. */
  pending?: boolean;
  className?: string;
  /** Called with the trimmed email once both fields pass. */
  onSubmit?: (values: LoginValues) => void;
}) {
  const id = useId();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [emailMessage, setEmailMessage] = useState<string | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const nextEmail = emailError(email);
    const nextPassword = password ? null : 'Enter a password.';
    setEmailMessage(nextEmail);
    setPasswordMessage(nextPassword);
    if (nextEmail || nextPassword) return;
    onSubmit?.({ email: email.trim(), password, remember });
  }

  return (
    <AuthPanel
      title="Sign in"
      description="Use the email and password for your workspace."
      brand={brand}
      aside={aside}
      className={className}
      footer={
        <>
          New here? <AuthLink href={registerHref}>Create an account</AuthLink>
        </>
      }
    >
      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-6">
        <FieldGroup>
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
              autoComplete="current-password"
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
          <Field orientation="horizontal">
            <Checkbox
              id={`${id}-remember`}
              checked={remember}
              disabled={pending}
              onCheckedChange={setRemember}
            />
            <FieldLabel htmlFor={`${id}-remember`}>Remember me</FieldLabel>
          </Field>
        </FieldGroup>
        <Button type="submit" className="w-full" loading={pending} disabled={pending}>
          Sign in
        </Button>
      </form>
    </AuthPanel>
  );
}
