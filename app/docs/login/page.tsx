import { LoginPage } from '#components/auth/login-page';
import { ComponentPreview } from '#lib/docs/ComponentPreview';
import { DocPage, DocSection } from '#lib/docs/DocPage';

const FRAME = 'h-[640px]';

const pageCode = `import { LoginPage } from "@/components/auth/login-page";

export default function Page() {
  return <LoginPage />;
}`;

export default function LoginDoc() {
  return (
    <DocPage
      title="Login"
      slug="login"
      description="A sign-in screen: email, password, remember me, and a link to create an account."
    >
      <DocSection title="The page">
        <p className="text-site-body text-muted-foreground">
          One install fills the screen. Sign in checks the email and the password, and a message
          sits under the field that needs it. Create an account opens Register. In this preview
          that link goes to the Register doc. The installed page uses <code>/register</code>.
        </p>
        <ComponentPreview code={pageCode} padding="none" minHeightClass={FRAME} align="top">
          <div className={`flex w-full ${FRAME}`}>
            <LoginPage className="h-full min-h-0" registerHref="/docs/register" />
          </div>
        </ComponentPreview>
      </DocSection>
    </DocPage>
  );
}
