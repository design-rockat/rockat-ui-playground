import { defineConfig } from 'tsup';
import path from 'path';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: {
    resolve: true,
    compilerOptions: {
      incremental: false,
      noEmit: false,
    },
  },
  sourcemap: true,
  splitting: false,
  clean: true,
  external: ['react', 'react-dom', 'antd'],
  outDir: 'dist',
  // Preserve "use client" in both ESM and CJS outputs
  banner: { js: '"use client";' },
  // Use .js for ESM and .cjs for CJS to match package.json exports
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.cjs' : '.js',
    };
  },
  // Resolve the @/ path alias used in component source files (e.g. @/lib/cn)
  esbuildOptions(options) {
    options.alias = { '@': path.resolve('./src') };
  },
});
