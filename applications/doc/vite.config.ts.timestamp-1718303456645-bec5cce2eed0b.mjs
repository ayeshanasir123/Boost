// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/src/BOOST/node_modules/.pnpm/vite@5.2.11_@types+node@20.12.12_less@4.2.0/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import vue from "file:///C:/src/BOOST/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.2.11_@types+node@20.12.12_less@4.2.0__vue@3.4.27_typescript@5.4.5_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///C:/src/BOOST/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.2.11_@types+node@20.12.12_less@4.2.0__vue@3.4.27_typescript@5.4.5_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import nightwatchPlugin from "file:///C:/src/BOOST/node_modules/.pnpm/vite-plugin-nightwatch@0.4.6/node_modules/vite-plugin-nightwatch/index.js";
import VueDevTools from "file:///C:/src/BOOST/node_modules/.pnpm/vite-plugin-vue-devtools@7.2.1_rollup@4.18.0_vite@5.2.11_@types+node@20.12.12_less@4.2.0__vue@3.4.27_typescript@5.4.5_/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_dirname = "C:\\src\\BOOST\\applications\\doc";
var __vite_injected_original_import_meta_url = "file:///C:/src/BOOST/applications/doc/vite.config.ts";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxzcmNcXFxcQk9PU1RcXFxcYXBwbGljYXRpb25zXFxcXGRvY1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcc3JjXFxcXEJPT1NUXFxcXGFwcGxpY2F0aW9uc1xcXFxkb2NcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L3NyYy9CT09TVC9hcHBsaWNhdGlvbnMvZG9jL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcclxuaW1wb3J0IG5pZ2h0d2F0Y2hQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tbmlnaHR3YXRjaCdcclxuaW1wb3J0IFZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKCksXHJcbiAgICB2dWVKc3goKSxcclxuICAgIG5pZ2h0d2F0Y2hQbHVnaW4oKSxcclxuICAgIFZ1ZURldlRvb2xzKCksXHJcbiAgXSxcclxuICBidWlsZDoge1xyXG4gICAgbGliOiB7XHJcbiAgICAgIC8vIHNyYy9pbmRleHQudHMgaXMgd2hlcmUgd2UgaGF2ZSBleHBvcnRlZCB0aGUgY29tcG9uZW50KHMpXHJcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvYm9vc3QtZG9jLnRzXCIpLFxyXG4gICAgICBuYW1lOiBcImJvb3N0LWRvY1wiLFxyXG4gICAgICBmb3JtYXRzOiBbJ2VzJ10sXHJcblx0XHRcdGZpbGVOYW1lOiAoZm9ybWF0KSA9PiB7XHJcblx0XHRcdFx0c3dpdGNoIChmb3JtYXQpIHtcclxuXHRcdFx0XHRcdGNhc2UgJ2VzJzpcclxuXHRcdFx0XHRcdFx0cmV0dXJuICdib29zdC1kb2MubWpzJ1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcbiAgICB9LFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBleHRlcm5hbDogW1xyXG4gICAgICAgICdheGlvcycsXHJcbiAgICAgICAgJ3BpbmlhJyxcclxuICAgICAgICAndnVlJyxcclxuICAgICAgICAndnVldGlmeSdcclxuICAgICAgXSxcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgZXhwb3J0czogJ25hbWVkJyxcclxuICAgICAgICBnbG9iYWxzOiB7XHJcbiAgICAgICAgICBleHBvcnRzOiAnbmFtZWQnLFxyXG4gICAgICAgICAgdnVlOiAnVnVlJyxcclxuICAgICAgICAgIHBpbmlhOiAnUGluaWEnLFxyXG4gICAgICAgICAgYXhpb3M6ICdBeGlvcycsXHJcbiAgICAgICAgICB2dWV0aWZ5OiAnVnVldGlmeSdcclxuICAgICAgICB9LFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1SLFNBQVMsZUFBZSxXQUFXO0FBRXRULFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsZUFBZTtBQUN4QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sc0JBQXNCO0FBQzdCLE9BQU8saUJBQWlCO0FBUHhCLElBQU0sbUNBQW1DO0FBQWtJLElBQU0sMkNBQTJDO0FBVTVOLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLGlCQUFpQjtBQUFBLElBQ2pCLFlBQVk7QUFBQSxFQUNkO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUE7QUFBQSxNQUVILE9BQU8sUUFBUSxrQ0FBVyxrQkFBa0I7QUFBQSxNQUM1QyxNQUFNO0FBQUEsTUFDTixTQUFTLENBQUMsSUFBSTtBQUFBLE1BQ2pCLFVBQVUsQ0FBQyxXQUFXO0FBQ3JCLGdCQUFRLFFBQVE7QUFBQSxVQUNmLEtBQUs7QUFDSixtQkFBTztBQUFBLFFBQ1Q7QUFBQSxNQUNEO0FBQUEsSUFFQztBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsUUFDVCxTQUFTO0FBQUEsVUFDUCxTQUFTO0FBQUEsVUFDVCxLQUFLO0FBQUEsVUFDTCxPQUFPO0FBQUEsVUFDUCxPQUFPO0FBQUEsVUFDUCxTQUFTO0FBQUEsUUFDWDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFFRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
