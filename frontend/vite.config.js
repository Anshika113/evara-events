import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Frontend on :5174 proxies /api to the FastAPI backend on :5001.
// (Different ports from demo-9999 so both demos can run at the same time.)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
})
