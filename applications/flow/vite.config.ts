import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { resolve } from "path";
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import nightwatchPlugin from 'vite-plugin-nightwatch'
import VueDevTools from 'vite-plugin-vue-devtools'

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
      entry: resolve(__dirname, "src/boost-flow.ts"),
      name: "app1",
      formats: ['es'],
			fileName: (format) => {
				switch (format) {
					case 'es':
						return 'boost-flow.mjs'
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
          exports: 'named',
          vue: 'Vue',
          pinia: 'Pinia',
          axios: 'Axios',
        },
      }
    }
    
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@css': resolve(__dirname, '../../lib/css')
    }
  }
})
