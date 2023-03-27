// vite.config.ts
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';

export default defineConfig({
  base: '/code-viz-web/',
  plugins: [
    reactRefresh(),
    chunkSplitPlugin()
  ]
})
