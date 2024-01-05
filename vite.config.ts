import { defineConfig } from "vite"
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  plugins: [
    react()
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer({}),
        tailwindcss,
        // add options if needed
      ],
    }
  },
  server: {
    port: 3040
  },
  preview: {
    port: 8080
  }
})