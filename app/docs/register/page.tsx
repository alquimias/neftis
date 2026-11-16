import { RegisterPage } from '#components/auth/register-page';
import { ComponentPreview } from '#lib/docs/ComponentPreview';
import { DocPage, DocSection } from '#lib/docs/DocPage';

const FRAME = 'h-[640px]';

const pageCode = `import { RegisterPage } from "@/components/auth/register-page";

export default function Page() {
  return <RegisterPage />;
}`;

export default function RegisterDoc() {
  return (
    <DocPage
      title="Register"
      slug="register"
      description="An account screen: name, email, password, and a link back to sign in."
    >
      <DocSection title="The page">
        <p className="text-site-body text-muted-foreground">
          The same screen as Login, with name, email, and password. Create account checks each
          field, and Sign in opens Login. In this preview that link goes to the Login doc. The
          installed page uses <code>/login</code>.
        </p>
        <ComponentPreview code={pageCode} padding="none" minHeightClass={FRAME} align="top">
          <div className={`flex w-full ${FRAME}`}>
            <RegisterPage className="h-full min-h-0" loginHref="/docs/login" />
          </div>
        </ComponentPreview>
      </DocSection>
    </DocPage>
  );
}
