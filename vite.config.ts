import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import os from 'node:os'

// Local canonical design system (consumed from source — kept local, not published).
const DS = path.resolve(os.homedir(), 'jofrom-design-system/src')
const nm = (m: string) => path.resolve(__dirname, 'node_modules', m)

// DS subpath exports → DS source entrypoints.
const dsSubpaths = [
  'ui', 'form', 'icons', 'widgets', 'data-display', 'charts',
  'sections', 'feedback', 'shells', 'layout', 'components',
]

// The DS lives in a sibling dir with no node_modules, so its bare imports must
// resolve to THIS app's installed copies (and React must be deduped).
const sharedDeps = [
  'clsx', 'tailwind-merge', 'lucide-react', 'recharts',
  '@radix-ui/react-alert-dialog', '@radix-ui/react-checkbox', '@radix-ui/react-dialog',
  '@radix-ui/react-dropdown-menu', '@radix-ui/react-popover', '@radix-ui/react-progress',
  '@radix-ui/react-radio-group', '@radix-ui/react-select', '@radix-ui/react-switch',
  '@radix-ui/react-tabs', '@radix-ui/react-toast', '@radix-ui/react-tooltip',
]

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: [
      { find: '@jofrom/design-system/styles.css', replacement: path.join(DS, 'styles.css') },
      ...dsSubpaths.map((p) => ({
        find: `@jofrom/design-system/${p}`,
        replacement: path.join(DS, 'components', p === 'components' ? '' : p, 'index.ts'),
      })),
      { find: '@jofrom/design-system', replacement: path.join(DS, 'index.ts') },
      // shared singletons/deps for the source-consumed DS
      { find: /^react$/, replacement: nm('react') },
      { find: /^react-dom$/, replacement: nm('react-dom') },
      { find: 'react/jsx-runtime', replacement: nm('react/jsx-runtime') },
      { find: 'react/jsx-dev-runtime', replacement: nm('react/jsx-dev-runtime') },
      ...sharedDeps.map((m) => ({ find: m, replacement: nm(m) })),
      { find: '@', replacement: path.resolve(__dirname, './src') },
    ],
  },
  server: {
    port: 4321,
    fs: { allow: [path.resolve(__dirname), DS, path.dirname(DS)] },
  },
})
