import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/lca': {
        target: 'https://www.lcacommons.gov/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/lca/, ''),
      },
    },
  },
})
