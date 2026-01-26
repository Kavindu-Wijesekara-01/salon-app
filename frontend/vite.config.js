
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      // Login & Register සඳහා
      '/auth': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      // අලුතින් හදපු Services සඳහා
      '/services': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      // Admin Dashboard දත්ත සඳහා
      '/dashboard': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/appointments': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/reviews': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})