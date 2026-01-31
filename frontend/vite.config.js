import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Docker ඇතුලේ එළියට විවෘත වෙන්න මේක ඕන
    proxy: {
      // Login & Register සඳහා
      '/auth': {
        target: 'http://salon_server:5000', // වෙනස් කළා ✅
        changeOrigin: true,
        secure: false,
      },
      // අලුතින් හදපු Services සඳහා
      '/services': {
        target: 'http://salon_server:5000', // වෙනස් කළා ✅
        changeOrigin: true,
        secure: false,
      },
      // Admin Dashboard දත්ත සඳහා
      '/dashboard': {
        target: 'http://salon_server:5000', // වෙනස් කළා ✅
        changeOrigin: true,
        secure: false,
      },
      '/appointments': {
        target: 'http://salon_server:5000', // වෙනස් කළා ✅
        changeOrigin: true,
        secure: false,
      },
      '/reviews': {
        target: 'http://salon_server:5000', // වෙනස් කළා ✅
        changeOrigin: true,
        secure: false,
      },
    },
  },
})