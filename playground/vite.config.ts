import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const isDev = process.env.NODE_ENV !== 'production';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: isDev
      ? {
          'ycs-library/style.css': path.resolve(__dirname, '../dist/index.css'),
          'ycs-library': path.resolve(__dirname, '../src'),
        }
      : {},
  },
});