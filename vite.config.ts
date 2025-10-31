import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    // ❌ supprime toute référence vers postcss.config.cjs
    // Vite le charge automatiquement
  },
  server: {
    port: 5173,
  },
})
optimizeDeps: {
  exclude: ['sucrase']
}
