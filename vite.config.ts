import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: './lib/main.ts',
      name: 'canvas-craft',
      fileName: 'canvas-craft',
    },
    minify: false,
  },
  plugins: [dts({ include: ['lib'] })],
});
