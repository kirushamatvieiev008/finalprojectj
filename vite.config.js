import { defineConfig } from 'vite'
import { ViteEjsPlugin } from 'vite-plugin-ejs'

export default defineConfig({
  base: '/finalprojectj/',
  plugins: [ViteEjsPlugin()],
})