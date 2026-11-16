import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** The docs site swaps these two modules for a hover-mode preview.
 *  Apps use the registry implementation, the same file a shadcn install gets. */
export const neftisAliases = [
  {
    find: 'next/link',
    replacement: path.join(root, 'erp/shims/next-link.tsx'),
  },
  {
    find: '#hooks/use-fluid-hover',
    replacement: path.join(root, 'registry/default/hooks/use-fluid-hover.ts'),
  },
  {
    find: '#components/ui/fluid-hover-highlight',
    replacement: path.join(root, 'registry/default/fluid-hover-highlight.tsx'),
  },
];
