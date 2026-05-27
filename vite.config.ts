import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import os from 'node:os'

// Local canonical design system (consumed from source — kept local, not published).
const DS = path.resolve(os.homedir(), 'Jo_Design_System/src')

// Map @jofrom/design-system[/subpath] → the DS source entrypoints.
const dsSubpaths = [
  'ui', 'form', 'icons', 'widgets', 'data-display', 'charts',
  'sections', 'feedback', 'shells', 'layout', 'components',
]

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: '@jofrom/design-system/styles.css', replacement: path.join(DS, 'styles.css') },
      ...dsSubpaths.map((p) => ({
        find: `@jofrom/design-system/${p}`,
        replacement: path.join(DS, 'components', p === 'components' ? '' : p, 'index.ts'),
      })),
      { find: '@jofrom/design-system', replacement: path.join(DS, 'index.ts') },
      { find: '@', replacement: path.resolve(__dirname, './src') },
    ],
  },
  server: {
    port: 4321,
    fs: { allow: [path.resolve(__dirname), DS, path.dirname(DS)] },
  },
})
