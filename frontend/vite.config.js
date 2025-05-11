import { defineConfig } from 'vite'
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: {
      host: 'localhost', // Or the IP address of your host machine
      clientPort: 5173,
    },
    watch: { // Add this to explicitly tell Vite to watch files within the container
      usePolling: true, // Try this if file system events aren't being detected
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
})
