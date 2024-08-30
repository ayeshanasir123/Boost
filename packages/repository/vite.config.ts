import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import path from 'path';

export default defineConfig({
  plugins: [
    vue()
  ],
  build: {
    lib: {
      entry: [
          resolve(__dirname, 'src/index.ts'),
          resolve(__dirname, 'src/models/accounting.ts'),
          resolve(__dirname, 'src/models/sales.ts')
        ],
      name: 'boost-repository',
      formats: ['es'] // Ensure both ES and UMD formats are generated
    },
    rollupOptions: {
      external: [
        'pinia',
        'vue',
        'axios',
        '@boost/utils',
        '@boost/shared'
      ], // Add other external dependencies here
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src', // This keeps the directory structure starting from 'src'
        entryFileNames: 'repository.[name].js', // Keep the original file names        
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@boost/repository': resolve(__dirname, 'src')
    }
  }
});
