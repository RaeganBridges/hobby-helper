import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

const root = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    // Phones on the same Wi‑Fi can open http://<your-lan-ip>:5173/… (not localhost).
    host: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(root, 'index.html'),
        app: path.resolve(root, 'app.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(root, './src'),
      'figma:asset': path.resolve(root, './src/assets'),
    },
  },

  assetsInclude: ['**/*.svg', '**/*.csv'],
})
