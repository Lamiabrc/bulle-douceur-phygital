import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Empêche Sucrase ou d’autres parseurs d’interpréter les fichiers CSS
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.cjs',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 5173,
  },
})
