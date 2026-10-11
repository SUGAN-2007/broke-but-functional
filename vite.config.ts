import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
      open: false,
    }),
    {
      name: 'preload-dashboard-chunk',
      transformIndexHtml(html, ctx) {
        if (!ctx.bundle) return html
        for (const [fileName, chunk] of Object.entries(ctx.bundle)) {
          if (chunk.type === 'chunk' && chunk.name === 'Dashboard') {
            return html.replace(
              '</head>',
              `  <link rel="modulepreload" crossorigin href="/${fileName}">\n  </head>`
            )
          }
        }
        return html
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2022',
    modulePreload: {
      polyfill: false,
      resolveDependencies(_filename, deps) {
        return deps.filter((dep) => !dep.includes('charts'))
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          const norm = id.replace(/\\/g, '/')
          if (
            norm.includes('/node_modules/recharts/') ||
            norm.includes('/node_modules/victory-vendor/') ||
            norm.includes('/node_modules/d3-')
          ) {
            return 'charts'
          }
          if (
            norm.includes('/node_modules/react/') ||
            norm.includes('/node_modules/react-dom/') ||
            norm.includes('/node_modules/scheduler/') ||
            norm.includes('/node_modules/react-router/') ||
            norm.includes('/node_modules/react-router-dom/') ||
            norm.includes('/node_modules/react-is/') ||
            norm.includes('/node_modules/use-sync-external-store/') ||
            norm.includes('/node_modules/@reduxjs/') ||
            norm.includes('/node_modules/redux/') ||
            norm.includes('/node_modules/redux-thunk/') ||
            norm.includes('/node_modules/reselect/') ||
            norm.includes('/node_modules/immer/') ||
            norm.includes('/node_modules/react-redux/') ||
            norm.includes('/node_modules/clsx/') ||
            norm.includes('/node_modules/tailwind-merge/') ||
            norm.includes('/node_modules/class-variance-authority/') ||
            norm.includes('/node_modules/tslib/')
          ) {
            return 'react-vendor'
          }
          if (
            norm.includes('/node_modules/@radix-ui/') ||
            norm.includes('/node_modules/react-remove-scroll/') ||
            norm.includes('/node_modules/react-remove-scroll-bar/') ||
            norm.includes('/node_modules/react-style-singleton/') ||
            norm.includes('/node_modules/use-callback-ref/') ||
            norm.includes('/node_modules/use-sidecar/') ||
            norm.includes('/node_modules/aria-hidden/') ||
            norm.includes('/node_modules/get-nonce/')
          ) {
            return 'radix'
          }
        },
      },
    },
  },
})
