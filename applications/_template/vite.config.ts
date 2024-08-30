import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { readFileSync } from 'fs';
import { resolve } from "path";
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import nightwatchPlugin from 'vite-plugin-nightwatch'
import VueDevTools from 'vite-plugin-vue-devtools'

// Read and parse the package.json file
const packageJson = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'));

// Extract customConfig and appKey from package.json
const appKey = packageJson.appKey;
// Construct the entry point and output file name based on appKey
const entryPoint = `src/boost-${appKey}.ts`;
const outputFileName = `boost-${appKey}.mjs`;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    nightwatchPlugin(),
    VueDevTools(),
  ],
  build: {
    lib: {
      // src/indext.ts is where we have exported the component(s)
      entry: resolve(__dirname, entryPoint),
      name: appKey,
      formats: ['es'],
			fileName: (format) => {
				switch (format) {
					case 'es':
						return outputFileName
				}
			},

    },
    rollupOptions: {
      external: [
        'axios',
        'pinia',
        'vue',
      ],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          pinia: 'Pinia',
          axios: 'axios',
        },
      }
    }
    
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
