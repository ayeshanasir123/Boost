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
      entry: resolve(__dirname, "src/boost-doc.ts"),
      name: "boost-doc",
      formats: ['es'],
			fileName: (format) => {
				switch (format) {
					case 'es':
						return 'boost-doc.mjs'
				}
			},

    },
    rollupOptions: {
      external: [
        'pinia',
        'vue',
        'vuetify',
        'vue-router',
        'i18n',
        '@boost/repository',
        '@boost/shared',
        '@bryntum/core-thin',
        '@bryntum/core-vue-3-thin',
        '@bryntum/grid-thin',
        '@bryntum/grid-vue-3-thin',
        '@bryntum/engine-thin',
        '@bryntum/taskboard-vue-3-thin',
        '@bryntum/taskboard-thin',
        '@bryntum/scheduler-vue-3-thin',
        '@bryntum/scheduler-thin',
        '@bryntum/schedulerpro-vue-3-thin',
        '@bryntum/schedulerpro-thin',
        '@bryntum/gantt-vue-3-thin',
        '@bryntum/gantt-thin',
        '@bryntum/calendar-vue-3-thin',
        '@bryntum/calendar-thin'    
      ],
      output: {
        exports: 'named',
        globals: {
          exports: 'named',
          vue: 'Vue',
          pinia: 'Pinia',
          axios: 'Axios',
          vuetify: 'Vuetify'
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
