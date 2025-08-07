import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/tts': {
        target: 'https://openspeech.bytedance.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/tts/, ''),
      },
    },
  },
})