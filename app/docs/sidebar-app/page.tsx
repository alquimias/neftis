'use client';

import { SidebarProvider, SidebarInset } from '#components/flavored/sidebar';
import { AppSidebar } from '#components/sidebar-app/app-sidebar';
import { SidebarInsetTopbar } from '#components/sidebar-app/inset-topbar';
import { ComponentPreview } from '#lib/docs/ComponentPreview';
import { DocPage, DocSection } from '#lib/docs/DocPage';

const SHELL_HEIGHT = 'h-[560px] md:h-[640px]';

const shellCode = `"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar-app/app-sidebar";
import { SidebarInsetTopbar } from "@/components/sidebar-app/inset-topbar";

export default function Page() {
  return (
    <SidebarProvider peek="hover">
      <AppSidebar />
      <SidebarInset>
        <SidebarInsetTopbar />
        <main className="flex flex-1 flex-col gap-4 p-4">{/* your page */}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}`;

export default function AppShellDoc() {
  return (
    <DocPage
      title="App Shell"
      slug="sidebar-app"
      description="A complete app shell: workspace header, search field, collapsible sections with badges, user footer, and an inset topbar."
    >
      <DocSection title="The page">
        <p className="text-site-body text-muted-foreground">
          One install fills the screen. The sidebar, the inset, and the topbar arrive already
          composed. Swap the names in <code>AppSidebar</code> and the rows in <code>nav-data.ts</code>{' '}
          for your own. The installed page reads the <code>sidebar_state</code> cookie so the rail
          opens where you left it. This preview does not write that cookie.
        </p>
        <ComponentPreview code={shellCode} padding="none" minHeightClass={SHELL_HEIGHT}>
          <div className={`relative flex w-full overflow-hidden bg-background ${SHELL_HEIGHT}`}>
            <SidebarProvider
              className="h-full min-h-0"
              persist={false}
              mobileBreakpoint={0}
              peek="hover"
            >
              <AppSidebar className="h-full" />
              <SidebarInset className="min-h-0">
                <SidebarInsetTopbar />
                <main className="flex flex-1 flex-col gap-4 p-4" />
              </SidebarInset>
            </SidebarProvider>
          </div>
        </ComponentPreview>
      </DocSection>
    </DocPage>
  );
}
