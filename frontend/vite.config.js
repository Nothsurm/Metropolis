import { defineConfig } from 'vite'
import { NgmiPolyfill } from "vite-plugin-ngmi-polyfill";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    NgmiPolyfill()
  ],
  server: {
    proxy: {
      "/api/": "http://localhost:5000",
      "/uploads/": "http://localhost:5000",
    }
  }
})
