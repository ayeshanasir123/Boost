// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///home/danieln/src/BOOST/node_modules/.pnpm/vite@5.2.12_@types+node@20.14.0_less@4.2.0/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import vue from "file:///home/danieln/src/BOOST/node_modules/.pnpm/@vitejs+plugin-vue@5.0.5_vite@5.2.12_@types+node@20.14.0_less@4.2.0__vue@3.4.27_typescript@5.4.5_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///home/danieln/src/BOOST/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.2.12_@types+node@20.14.0_less@4.2.0__vue@3.4.27_typescript@5.4.5_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import nightwatchPlugin from "file:///home/danieln/src/BOOST/node_modules/.pnpm/vite-plugin-nightwatch@0.4.6/node_modules/vite-plugin-nightwatch/index.js";
import VueDevTools from "file:///home/danieln/src/BOOST/node_modules/.pnpm/vite-plugin-vue-devtools@7.2.1_rollup@4.18.0_vite@5.2.12_@types+node@20.14.0_less@4.2.0__vue@3.4.27_typescript@5.4.5_/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_dirname = "/home/danieln/src/BOOST/applications/doc";
var __vite_injected_original_import_meta_url = "file:///home/danieln/src/BOOST/applications/doc/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    nightwatchPlugin(),
    VueDevTools()
  ],
  build: {
    lib: {
      // src/indext.ts is where we have exported the component(s)
      entry: resolve(__vite_injected_original_dirname, "src/boost-doc.ts"),
      name: "boost-doc",
      formats: ["es"],
      fileName: (format) => {
        switch (format) {
          case "es":
            return "boost-doc.mjs";
        }
      }
    },
    rollupOptions: {
      external: [
        "axios",
        "pinia",
        "vue",
        "vuetify"
      ],
      output: {
        exports: "named",
        globals: {
          exports: "named",
          vue: "Vue",
          pinia: "Pinia",
          axios: "Axios",
          vuetify: "Vuetify"
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9kYW5pZWxuL3NyYy9CT09TVC9hcHBsaWNhdGlvbnMvZG9jXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9kYW5pZWxuL3NyYy9CT09TVC9hcHBsaWNhdGlvbnMvZG9jL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2RhbmllbG4vc3JjL0JPT1NUL2FwcGxpY2F0aW9ucy9kb2Mvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcblxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXG5pbXBvcnQgbmlnaHR3YXRjaFBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1uaWdodHdhdGNoJ1xuaW1wb3J0IFZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICB2dWVKc3goKSxcbiAgICBuaWdodHdhdGNoUGx1Z2luKCksXG4gICAgVnVlRGV2VG9vbHMoKSxcbiAgXSxcbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHtcbiAgICAgIC8vIHNyYy9pbmRleHQudHMgaXMgd2hlcmUgd2UgaGF2ZSBleHBvcnRlZCB0aGUgY29tcG9uZW50KHMpXG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2Jvb3N0LWRvYy50c1wiKSxcbiAgICAgIG5hbWU6IFwiYm9vc3QtZG9jXCIsXG4gICAgICBmb3JtYXRzOiBbJ2VzJ10sXG5cdFx0XHRmaWxlTmFtZTogKGZvcm1hdCkgPT4ge1xuXHRcdFx0XHRzd2l0Y2ggKGZvcm1hdCkge1xuXHRcdFx0XHRcdGNhc2UgJ2VzJzpcblx0XHRcdFx0XHRcdHJldHVybiAnYm9vc3QtZG9jLm1qcydcblx0XHRcdFx0fVxuXHRcdFx0fSxcblxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFtcbiAgICAgICAgJ2F4aW9zJyxcbiAgICAgICAgJ3BpbmlhJyxcbiAgICAgICAgJ3Z1ZScsXG4gICAgICAgICd2dWV0aWZ5J1xuICAgICAgXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBleHBvcnRzOiAnbmFtZWQnLFxuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgZXhwb3J0czogJ25hbWVkJyxcbiAgICAgICAgICB2dWU6ICdWdWUnLFxuICAgICAgICAgIHBpbmlhOiAnUGluaWEnLFxuICAgICAgICAgIGF4aW9zOiAnQXhpb3MnLFxuICAgICAgICAgIHZ1ZXRpZnk6ICdWdWV0aWZ5J1xuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFMsU0FBUyxlQUFlLFdBQVc7QUFFN1UsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxzQkFBc0I7QUFDN0IsT0FBTyxpQkFBaUI7QUFQeEIsSUFBTSxtQ0FBbUM7QUFBK0ksSUFBTSwyQ0FBMkM7QUFVek8sSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsaUJBQWlCO0FBQUEsSUFDakIsWUFBWTtBQUFBLEVBQ2Q7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQTtBQUFBLE1BRUgsT0FBTyxRQUFRLGtDQUFXLGtCQUFrQjtBQUFBLE1BQzVDLE1BQU07QUFBQSxNQUNOLFNBQVMsQ0FBQyxJQUFJO0FBQUEsTUFDakIsVUFBVSxDQUFDLFdBQVc7QUFDckIsZ0JBQVEsUUFBUTtBQUFBLFVBQ2YsS0FBSztBQUNKLG1CQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0Q7QUFBQSxJQUVDO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLFNBQVM7QUFBQSxRQUNULFNBQVM7QUFBQSxVQUNQLFNBQVM7QUFBQSxVQUNULEtBQUs7QUFBQSxVQUNMLE9BQU87QUFBQSxVQUNQLE9BQU87QUFBQSxVQUNQLFNBQVM7QUFBQSxRQUNYO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUVGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
