import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/login': {
        target: 'http://192.168.56.10:5001',
        changeOrigin: true,
      },
      '/protected': {
        target: 'http://192.168.56.10:5001',
        changeOrigin: true,
      },
      '/read_code': {
        target: 'http://192.168.56.10:5001',
        changeOrigin: true,
      },
      '/insert_code': {
        target: 'http://192.168.56.10:5001',
        changeOrigin: true,
      },
    },
  },
})
