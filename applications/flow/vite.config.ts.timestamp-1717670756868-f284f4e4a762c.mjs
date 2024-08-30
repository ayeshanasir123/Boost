// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/src/BOOST/node_modules/.pnpm/vite@5.2.11_@types+node@20.12.12_less@4.2.0/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import vue from "file:///C:/src/BOOST/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.2.11_@types+node@20.12.12_less@4.2.0__vue@3.4.27_typescript@5.4.5_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///C:/src/BOOST/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.2.11_@types+node@20.12.12_less@4.2.0__vue@3.4.27_typescript@5.4.5_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import nightwatchPlugin from "file:///C:/src/BOOST/node_modules/.pnpm/vite-plugin-nightwatch@0.4.6/node_modules/vite-plugin-nightwatch/index.js";
import VueDevTools from "file:///C:/src/BOOST/node_modules/.pnpm/vite-plugin-vue-devtools@7.2.1_rollup@4.18.0_vite@5.2.11_@types+node@20.12.12_less@4.2.0__vue@3.4.27_typescript@5.4.5_/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_dirname = "C:\\src\\BOOST\\applications\\mindmap";
var __vite_injected_original_import_meta_url = "file:///C:/src/BOOST/applications/mindmap/vite.config.ts";
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
      entry: resolve(__vite_injected_original_dirname, "src/boost-mindmap.ts"),
      name: "app1",
      formats: ["es"],
      fileName: (format) => {
        switch (format) {
          case "es":
            return "boost-app1.mjs";
        }
      }
    },
    rollupOptions: {
      external: [
        "axios",
        "pinia",
        "vue"
      ],
      output: {
        exports: "named",
        globals: {
          exports: "named",
          vue: "Vue",
          pinia: "Pinia",
          axios: "Axios"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxzcmNcXFxcQk9PU1RcXFxcYXBwbGljYXRpb25zXFxcXG1pbmRtYXBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHNyY1xcXFxCT09TVFxcXFxhcHBsaWNhdGlvbnNcXFxcbWluZG1hcFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovc3JjL0JPT1NUL2FwcGxpY2F0aW9ucy9taW5kbWFwL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcclxuaW1wb3J0IG5pZ2h0d2F0Y2hQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tbmlnaHR3YXRjaCdcclxuaW1wb3J0IFZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKCksXHJcbiAgICB2dWVKc3goKSxcclxuICAgIG5pZ2h0d2F0Y2hQbHVnaW4oKSxcclxuICAgIFZ1ZURldlRvb2xzKCksXHJcbiAgXSxcclxuICBidWlsZDoge1xyXG4gICAgbGliOiB7XHJcbiAgICAgIC8vIHNyYy9pbmRleHQudHMgaXMgd2hlcmUgd2UgaGF2ZSBleHBvcnRlZCB0aGUgY29tcG9uZW50KHMpXHJcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvYm9vc3QtbWluZG1hcC50c1wiKSxcclxuICAgICAgbmFtZTogXCJhcHAxXCIsXHJcbiAgICAgIGZvcm1hdHM6IFsnZXMnXSxcclxuXHRcdFx0ZmlsZU5hbWU6IChmb3JtYXQpID0+IHtcclxuXHRcdFx0XHRzd2l0Y2ggKGZvcm1hdCkge1xyXG5cdFx0XHRcdFx0Y2FzZSAnZXMnOlxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gJ2Jvb3N0LWFwcDEubWpzJ1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcbiAgICB9LFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBleHRlcm5hbDogW1xyXG4gICAgICAgICdheGlvcycsXHJcbiAgICAgICAgJ3BpbmlhJyxcclxuICAgICAgICAndnVlJyxcclxuICAgICAgXSxcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgZXhwb3J0czogJ25hbWVkJyxcclxuICAgICAgICBnbG9iYWxzOiB7XHJcbiAgICAgICAgICBleHBvcnRzOiAnbmFtZWQnLFxyXG4gICAgICAgICAgdnVlOiAnVnVlJyxcclxuICAgICAgICAgIHBpbmlhOiAnUGluaWEnLFxyXG4gICAgICAgICAgYXhpb3M6ICdBeGlvcycsXHJcbiAgICAgICAgfSxcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgfSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUErUixTQUFTLGVBQWUsV0FBVztBQUVsVSxTQUFTLG9CQUFvQjtBQUM3QixTQUFTLGVBQWU7QUFDeEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixPQUFPLHNCQUFzQjtBQUM3QixPQUFPLGlCQUFpQjtBQVB4QixJQUFNLG1DQUFtQztBQUEwSSxJQUFNLDJDQUEyQztBQVVwTyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxpQkFBaUI7QUFBQSxJQUNqQixZQUFZO0FBQUEsRUFDZDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBO0FBQUEsTUFFSCxPQUFPLFFBQVEsa0NBQVcsc0JBQXNCO0FBQUEsTUFDaEQsTUFBTTtBQUFBLE1BQ04sU0FBUyxDQUFDLElBQUk7QUFBQSxNQUNqQixVQUFVLENBQUMsV0FBVztBQUNyQixnQkFBUSxRQUFRO0FBQUEsVUFDZixLQUFLO0FBQ0osbUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRDtBQUFBLElBRUM7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVU7QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsUUFDVCxTQUFTO0FBQUEsVUFDUCxTQUFTO0FBQUEsVUFDVCxLQUFLO0FBQUEsVUFDTCxPQUFPO0FBQUEsVUFDUCxPQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFFRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
