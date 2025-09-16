import { defineConfig, loadEnv } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import {tanstackRouter} from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
    tanstackRouter({ autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
  ],
  define: {
    'process.env.REACT_APP_POCKETBASE_URL': env.REACT_APP_POCKETBASE_URL,
  },
  resolve: {},
}})
