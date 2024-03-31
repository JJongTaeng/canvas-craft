import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './lib/main.ts',
      name: 'canvas-craft',
      fileName: 'canvas-craft'
    },
    minify: false
  }
})
