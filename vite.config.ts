import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [
    react({
      babel: { babelrc: true },
    }),
  ],
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },
})
