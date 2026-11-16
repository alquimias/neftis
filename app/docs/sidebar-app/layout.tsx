import { docMetadata } from '#lib/docs/metadata';

export const metadata = docMetadata('sidebar-app');

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
