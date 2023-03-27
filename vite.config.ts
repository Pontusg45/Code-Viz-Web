// vite.config.ts
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';

export default defineConfig({
  base: '/Code-Viz-Web/',
  plugins: [
    reactRefresh(),
    chunkSplitPlugin()
  ]
})
