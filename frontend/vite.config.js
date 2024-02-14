import { defineConfig } from 'vite'
import { NgmiPolyfill } from "vite-plugin-ngmi-polyfill";
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    NgmiPolyfill(),
    nodePolyfills()
  ],
  external: [
    "vite-plugin-node-polyfills/shims/global",
  ],
  server: {
    proxy: {
      "/api/": "http://localhost:5000",
      "/uploads/": "http://localhost:5000",
    }
  }
})
