import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'ycs-library': path.resolve(__dirname, isProd ? '../dist' : '../src'),
      'ycs-style': path.resolve(__dirname, '../dist/index.css'),
    },
  },
})
