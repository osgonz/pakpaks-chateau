import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        //TODO: replace hard coded value with ENV variable(?)
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    }
  },
})
