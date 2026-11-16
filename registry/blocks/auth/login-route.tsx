import { LoginPage } from '#components/auth/login-page';

// onSubmit receives { email, password, remember } once the fields are valid.
// registerHref defaults to /register.

export default function Page() {
  return <LoginPage />;
}
