import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import EnvironmentPlugin from 'vite-plugin-environment'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), EnvironmentPlugin('all')],
  server: {
    host: true,
    port: 3000
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
