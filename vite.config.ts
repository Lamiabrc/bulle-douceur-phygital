// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// ✅ Configuration stable pour Vite 5 + React + Tailwind
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    // Vite détecte automatiquement postcss.config.cjs
  },
  server: {
    port: 5173,
  },
  optimizeDeps: {
    exclude: ['sucrase'], // empêche Sucrase de parser le CSS
  },
})
