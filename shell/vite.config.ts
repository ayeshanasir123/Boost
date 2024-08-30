import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vuetify from 'vite-plugin-vuetify';
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import nightwatchPlugin from 'vite-plugin-nightwatch'
import VueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'path';

const isProduction = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    nightwatchPlugin(),
    VueDevTools(),
    vuetify({autoImport: true})
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@boost/repository': isProduction
      ? '@boost/repository'
      : resolve(__dirname, '../packages/repository/src'),
      '@boost/ui': isProduction
      ? '@boost/ui'
      : resolve(__dirname, '../packages/ui/src'),
      '@boost/shared': isProduction
      ? '@boost/shared'
      : resolve(__dirname, '../packages/shared/src'),
      '@css': resolve(__dirname, '../lib/css')      
    }
  },
  build: {
    rollupOptions: {
      external: isProduction ? ['boost-app1'] : [],
      output: {
        exports: 'named',
        globals: {
          exports: 'named',
          i18n: 'i18n',
          vue: 'Vue',
          quill: 'quill',
          dropzone: 'dropzone',
          echarts: 'echarts',
          pinia: 'pinia',
          axios: 'axios',
          vuetify: 'Vuetify',
          jquery: 'jquery',
          '@boost/shared': '@boost/shared',
          '@boost/repository': '@boost/repository',
          '@boost/utils': '@boost/utils',
          '@bryntum/core-thin': '@bryntum/core-thin',
          '@bryntum/core-vue-3-thin': '@bryntum/core-vue-3-thin',
          '@bryntum/grid-thin': '@bryntum/grid-thin',
          '@bryntum/grid-vue-3-thin': '@bryntum/grid-vue-3-thin',
          '@bryntum/engine-thin': '@bryntum/engine-thin',
          '@bryntum/scheduler-vue-3-thin': '@bryntum/scheduler-vue-3-thin',
          '@bryntum/scheduler-thin': '@bryntum/scheduler-thin',
          '@bryntum/schedulerpro-vue-3-thin': '@bryntum/schedulerpro-vue-3-thin',
          '@bryntum/schedulerpro-thin': '@bryntum/schedulerpro-thin',
          '@bryntum/gantt-vue-3-thin': '@bryntum/gantt-vue-3-thin',
          '@bryntum/gantt-thin': '@bryntum/gantt-thin',
          '@bryntum/calendar-vue-3-thin': '@bryntum/calendar-vue-3-thin',
          '@bryntum/calendar-thin': '@bryntum/calendar-thin'
          },
      }      
    },
  },
  optimizeDeps: {
    include: ['@bryntum/core-thin',
      '@bryntum/core-vue-3-thin',
      '@bryntum/grid-thin',
      '@bryntum/grid-vue-3-thin',
      '@bryntum/engine-thin',
      '@bryntum/scheduler-vue-3-thin',
      '@bryntum/scheduler-thin',
      '@bryntum/schedulerpro-vue-3-thin',
      '@bryntum/schedulerpro-thin',
      '@bryntum/gantt-vue-3-thin',
      '@bryntum/gantt-thin',
      '@bryntum/calendar-vue-3-thin',
      '@bryntum/calendar-thin'
] // Add dependencies you want to pre-bundle
  }
})
