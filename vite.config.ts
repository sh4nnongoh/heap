import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts({
    tsconfigPath: './tsconfig.build.json',
  })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'heap',
      fileName: (format) => `heap.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
