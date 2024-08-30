import { defineConfig } from 'vite';
import { resolve } from 'path';
import vuetify from 'vite-plugin-vuetify';
import vue from "@vitejs/plugin-vue";
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [vue(),
    vuetify({autoImport: true}),
    visualizer()    
  ],
  css: {
    preprocessorOptions: {
      scss: {} // No additional data, just an empty object
    }
  },  
  build: {
    assetsInlineLimit: 0,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'boost-ui',
      fileName: (format) => `boost-ui.js`,
      formats: ['es'] // Ensure both ES and UMD formats are generated
    },
    rollupOptions: {
      external: [
        'pinia',
        'vue',
        'vuetify',
        'vue-router',
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
        '@bryntum/calendar-thin',
        'jquery'        
      ], // Add other external dependencies here
      output: {
        globals: {
          }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@boost/ui': resolve(__dirname, 'src'),
      '@css': resolve(__dirname, '../../lib/css')
    }
  }
});
