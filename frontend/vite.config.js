import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  define: {
    global: 'globalThis',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          blockchain: ['ethers'],
          ui: ['lucide-react', 'framer-motion'],
          utils: ['axios', '@tanstack/react-query']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})