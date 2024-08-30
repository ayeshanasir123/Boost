// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/src/BOOST/node_modules/.pnpm/vite@5.2.11_@types+node@20.14.10_less@4.2.0_sass@1.77.5/node_modules/vite/dist/node/index.js";
import vuetify from "file:///C:/src/BOOST/node_modules/.pnpm/vite-plugin-vuetify@2.0.3_vite@5.2.11_@types+node@20.14.10_less@4.2.0_sass@1.77.5__vue@3.4.27_plfvq4ez4xrkorou5btlk4kxda/node_modules/vite-plugin-vuetify/dist/index.mjs";
import vue from "file:///C:/src/BOOST/node_modules/.pnpm/@vitejs+plugin-vue@5.0.5_vite@5.2.11_@types+node@20.14.10_less@4.2.0_sass@1.77.5__vue@3.4.27_typescript@5.4.5_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///C:/src/BOOST/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.0.0_vite@5.2.11_@types+node@20.14.10_less@4.2.0_sass@1.77.5__vue@3.4.27_typescript@5.4.5_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import nightwatchPlugin from "file:///C:/src/BOOST/node_modules/.pnpm/vite-plugin-nightwatch@0.4.6/node_modules/vite-plugin-nightwatch/index.js";
import VueDevTools from "file:///C:/src/BOOST/node_modules/.pnpm/vite-plugin-vue-devtools@7.2.1_rollup@4.18.0_vite@5.2.11_@types+node@20.14.10_less@4.2.0_sass_lo4xvneyzpgaf3rmfhfmbjtvli/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "C:\\src\\BOOST\\shell";
var __vite_injected_original_import_meta_url = "file:///C:/src/BOOST/shell/vite.config.ts";
var isProduction = process.env.NODE_ENV === "production";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    nightwatchPlugin(),
    VueDevTools(),
    vuetify({ autoImport: true })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
      "@boost/repository": isProduction ? "@boost/repository" : resolve(__vite_injected_original_dirname, "../packages/repository/src"),
      "@boost/ui": isProduction ? "@boost/ui" : resolve(__vite_injected_original_dirname, "../packages/ui/src"),
      "@boost/shared": isProduction ? "@boost/shared" : resolve(__vite_injected_original_dirname, "../packages/shared/src"),
      "@css": resolve(__vite_injected_original_dirname, "../lib/css")
    }
  },
  build: {
    rollupOptions: {
      external: isProduction ? ["boost-app1"] : [],
      output: {
        exports: "named",
        globals: {
          exports: "named",
          i18n: "i18n",
          vue: "Vue",
          quill: "quill",
          dropzone: "dropzone",
          echarts: "echarts",
          pinia: "pinia",
          axios: "axios",
          vuetify: "Vuetify",
          "@bryntum/core-thin": "@bryntum/core-thin",
          "@bryntum/core-vue-3-thin": "@bryntum/core-vue-3-thin",
          "@bryntum/grid-thin": "@bryntum/grid-thin",
          "@bryntum/grid-vue-3-thin": "@bryntum/grid-vue-3-thin"
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      "@bryntum/core-thin",
      "@bryntum/core-vue-3-thin",
      "@bryntum/grid-thin",
      "@bryntum/grid-vue-3-thin"
    ]
    // Add dependencies you want to pre-bundle
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxzcmNcXFxcQk9PU1RcXFxcc2hlbGxcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHNyY1xcXFxCT09TVFxcXFxzaGVsbFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovc3JjL0JPT1NUL3NoZWxsL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVldGlmeSBmcm9tICd2aXRlLXBsdWdpbi12dWV0aWZ5JztcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcclxuaW1wb3J0IG5pZ2h0d2F0Y2hQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tbmlnaHR3YXRjaCdcclxuaW1wb3J0IFZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xyXG5cclxuY29uc3QgaXNQcm9kdWN0aW9uID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJztcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKCksXHJcbiAgICB2dWVKc3goKSxcclxuICAgIG5pZ2h0d2F0Y2hQbHVnaW4oKSxcclxuICAgIFZ1ZURldlRvb2xzKCksXHJcbiAgICB2dWV0aWZ5KHthdXRvSW1wb3J0OiB0cnVlfSlcclxuICBdLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgICAnQGJvb3N0L3JlcG9zaXRvcnknOiBpc1Byb2R1Y3Rpb25cclxuICAgICAgPyAnQGJvb3N0L3JlcG9zaXRvcnknXHJcbiAgICAgIDogcmVzb2x2ZShfX2Rpcm5hbWUsICcuLi9wYWNrYWdlcy9yZXBvc2l0b3J5L3NyYycpLFxyXG4gICAgICAnQGJvb3N0L3VpJzogaXNQcm9kdWN0aW9uXHJcbiAgICAgID8gJ0Bib29zdC91aSdcclxuICAgICAgOiByZXNvbHZlKF9fZGlybmFtZSwgJy4uL3BhY2thZ2VzL3VpL3NyYycpLFxyXG4gICAgICAnQGJvb3N0L3NoYXJlZCc6IGlzUHJvZHVjdGlvblxyXG4gICAgICA/ICdAYm9vc3Qvc2hhcmVkJ1xyXG4gICAgICA6IHJlc29sdmUoX19kaXJuYW1lLCAnLi4vcGFja2FnZXMvc2hhcmVkL3NyYycpLFxyXG4gICAgICAnQGNzcyc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi4vbGliL2NzcycpICAgICAgICAgXHJcbiAgICB9XHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBleHRlcm5hbDogaXNQcm9kdWN0aW9uID8gWydib29zdC1hcHAxJ10gOiBbXSxcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgZXhwb3J0czogJ25hbWVkJyxcclxuICAgICAgICBnbG9iYWxzOiB7XHJcbiAgICAgICAgICBleHBvcnRzOiAnbmFtZWQnLFxyXG4gICAgICAgICAgaTE4bjogJ2kxOG4nLFxyXG4gICAgICAgICAgdnVlOiAnVnVlJyxcclxuICAgICAgICAgIHF1aWxsOiAncXVpbGwnLFxyXG4gICAgICAgICAgZHJvcHpvbmU6ICdkcm9wem9uZScsXHJcbiAgICAgICAgICBlY2hhcnRzOiAnZWNoYXJ0cycsXHJcbiAgICAgICAgICBwaW5pYTogJ3BpbmlhJyxcclxuICAgICAgICAgIGF4aW9zOiAnYXhpb3MnLFxyXG4gICAgICAgICAgdnVldGlmeTogJ1Z1ZXRpZnknLFxyXG4gICAgICAgICAgJ0BicnludHVtL2NvcmUtdGhpbic6ICdAYnJ5bnR1bS9jb3JlLXRoaW4nLFxyXG4gICAgICAgICAgJ0BicnludHVtL2NvcmUtdnVlLTMtdGhpbic6ICdAYnJ5bnR1bS9jb3JlLXZ1ZS0zLXRoaW4nLFxyXG4gICAgICAgICAgJ0BicnludHVtL2dyaWQtdGhpbic6ICdAYnJ5bnR1bS9ncmlkLXRoaW4nLFxyXG4gICAgICAgICAgJ0BicnludHVtL2dyaWQtdnVlLTMtdGhpbic6ICdAYnJ5bnR1bS9ncmlkLXZ1ZS0zLXRoaW4nXHJcbiAgICAgICAgfSxcclxuICAgICAgfSAgICAgIFxyXG4gICAgfSxcclxuICB9LFxyXG4gIG9wdGltaXplRGVwczoge1xyXG4gICAgaW5jbHVkZTogWydAYnJ5bnR1bS9jb3JlLXRoaW4nLFxyXG4gICAgICAnQGJyeW50dW0vY29yZS12dWUtMy10aGluJyxcclxuICAgICAgJ0BicnludHVtL2dyaWQtdGhpbicsXHJcbiAgICAgICdAYnJ5bnR1bS9ncmlkLXZ1ZS0zLXRoaW4nLFxyXG4gICAgXSAvLyBBZGQgZGVwZW5kZW5jaWVzIHlvdSB3YW50IHRvIHByZS1idW5kbGVcclxuICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1AsU0FBUyxlQUFlLFdBQVc7QUFFblIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxzQkFBc0I7QUFDN0IsT0FBTyxpQkFBaUI7QUFDeEIsU0FBUyxlQUFlO0FBUnhCLElBQU0sbUNBQW1DO0FBQTBHLElBQU0sMkNBQTJDO0FBVXBNLElBQU0sZUFBZSxRQUFRLElBQUksYUFBYTtBQUc5QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxpQkFBaUI7QUFBQSxJQUNqQixZQUFZO0FBQUEsSUFDWixRQUFRLEVBQUMsWUFBWSxLQUFJLENBQUM7QUFBQSxFQUM1QjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxNQUNwRCxxQkFBcUIsZUFDbkIsc0JBQ0EsUUFBUSxrQ0FBVyw0QkFBNEI7QUFBQSxNQUNqRCxhQUFhLGVBQ1gsY0FDQSxRQUFRLGtDQUFXLG9CQUFvQjtBQUFBLE1BQ3pDLGlCQUFpQixlQUNmLGtCQUNBLFFBQVEsa0NBQVcsd0JBQXdCO0FBQUEsTUFDN0MsUUFBUSxRQUFRLGtDQUFXLFlBQVk7QUFBQSxJQUN6QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLFVBQVUsZUFBZSxDQUFDLFlBQVksSUFBSSxDQUFDO0FBQUEsTUFDM0MsUUFBUTtBQUFBLFFBQ04sU0FBUztBQUFBLFFBQ1QsU0FBUztBQUFBLFVBQ1AsU0FBUztBQUFBLFVBQ1QsTUFBTTtBQUFBLFVBQ04sS0FBSztBQUFBLFVBQ0wsT0FBTztBQUFBLFVBQ1AsVUFBVTtBQUFBLFVBQ1YsU0FBUztBQUFBLFVBQ1QsT0FBTztBQUFBLFVBQ1AsT0FBTztBQUFBLFVBQ1AsU0FBUztBQUFBLFVBQ1Qsc0JBQXNCO0FBQUEsVUFDdEIsNEJBQTRCO0FBQUEsVUFDNUIsc0JBQXNCO0FBQUEsVUFDdEIsNEJBQTRCO0FBQUEsUUFDOUI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVM7QUFBQSxNQUFDO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
