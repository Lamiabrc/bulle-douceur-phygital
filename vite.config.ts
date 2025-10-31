// vite.config.ts
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// ✅ Configuration compatible Node 20 + Vite 5 + React + Tailwind
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: path.resolve(__dirname, './postcss.config.cjs'),
  },
  server: {
    port: 5173,
  },
})
