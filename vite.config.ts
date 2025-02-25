import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'manifest.json',
          dest: '.',
        },
      ],
    }),
  ],
  build: {
    outDir: 'build',
    rollupOptions: {
      input: {
        main: './index.html',
        'service-worker': './src/service-worker.ts'
      },
      output: {
        // More info about this configuration: https://stackoverflow.com/questions/71355290/prevent-service-worker-js-from-being-bundled-with-vite-rollup
        entryFileNames: assetInfo => {
          return assetInfo.name === 'service-worker'
             ? '[name].js'                  // put service worker in root
             : 'assets/[name]-[hash].js' // others in `assets/`
        }
      }
    },
  },
});
