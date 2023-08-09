import glsl from 'vite-plugin-glsl';
import eslintPlugin from 'vite-plugin-eslint';
import { defineConfig } from 'vite';

// vite.config.js
export default defineConfig({
  base: 'https://domain.com/',
  plugins: [
    eslintPlugin(), 
    glsl()],
  server: {
    host: 'localhost',
    cors: '*',
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },
  build: {
    minify: true,
    manifest: true,
    rollupOptions: {
      input: './src/main.js',
      output: {
        format: 'esm',
        generatedCode: {
          preset: 'es5',
          arrowFunctions: false
        },
        entryFileNames: 'main.js',
        chunkFileNames: 'main-[name].js',
        assetFileNames: 'main-style.[ext]',
        esModule: true,
        compact: true,
        globals: {
          jquery: '$',
        },
        dynamicImportVars: true,
        makeAbsoluteExternalsRelative: true,
      },
      external: ['jquery'],
    },
  }
})


