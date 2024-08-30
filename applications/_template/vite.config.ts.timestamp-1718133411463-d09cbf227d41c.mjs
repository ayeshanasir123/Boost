// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///home/danieln/src/BOOST/node_modules/.pnpm/vite@5.2.12_@types+node@20.14.0_less@4.2.0/node_modules/vite/dist/node/index.js";
import { readFileSync } from "fs";
import { resolve } from "path";
import vue from "file:///home/danieln/src/BOOST/node_modules/.pnpm/@vitejs+plugin-vue@5.0.5_vite@5.2.12_@types+node@20.14.0_less@4.2.0__vue@3.4.27_typescript@5.4.5_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///home/danieln/src/BOOST/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.2.12_@types+node@20.14.0_less@4.2.0__vue@3.4.27_typescript@5.4.5_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import nightwatchPlugin from "file:///home/danieln/src/BOOST/node_modules/.pnpm/vite-plugin-nightwatch@0.4.6/node_modules/vite-plugin-nightwatch/index.js";
import VueDevTools from "file:///home/danieln/src/BOOST/node_modules/.pnpm/vite-plugin-vue-devtools@7.2.1_rollup@4.18.0_vite@5.2.12_@types+node@20.14.0_less@4.2.0__vue@3.4.27_typescript@5.4.5_/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_dirname = "/home/danieln/src/BOOST/applications/_template";
var __vite_injected_original_import_meta_url = "file:///home/danieln/src/BOOST/applications/_template/vite.config.ts";
var packageJson = JSON.parse(readFileSync(resolve(__vite_injected_original_dirname, "package.json"), "utf-8"));
var appKey = packageJson.appKey;
var entryPoint = `src/boost-${appKey}.ts`;
var outputFileName = `boost-${appKey}.mjs`;
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
      entry: resolve(__vite_injected_original_dirname, entryPoint),
      name: appKey,
      formats: ["es"],
      fileName: (format) => {
        switch (format) {
          case "es":
            return outputFileName;
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
          vue: "Vue",
          pinia: "Pinia",
          axios: "axios"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9kYW5pZWxuL3NyYy9CT09TVC9hcHBsaWNhdGlvbnMvX3RlbXBsYXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9kYW5pZWxuL3NyYy9CT09TVC9hcHBsaWNhdGlvbnMvX3RlbXBsYXRlL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2RhbmllbG4vc3JjL0JPT1NUL2FwcGxpY2F0aW9ucy9fdGVtcGxhdGUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcblxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gJ2ZzJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXG5pbXBvcnQgbmlnaHR3YXRjaFBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1uaWdodHdhdGNoJ1xuaW1wb3J0IFZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcblxuLy8gUmVhZCBhbmQgcGFyc2UgdGhlIHBhY2thZ2UuanNvbiBmaWxlXG5jb25zdCBwYWNrYWdlSnNvbiA9IEpTT04ucGFyc2UocmVhZEZpbGVTeW5jKHJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZS5qc29uJyksICd1dGYtOCcpKTtcblxuLy8gRXh0cmFjdCBjdXN0b21Db25maWcgYW5kIGFwcEtleSBmcm9tIHBhY2thZ2UuanNvblxuY29uc3QgYXBwS2V5ID0gcGFja2FnZUpzb24uYXBwS2V5O1xuLy8gQ29uc3RydWN0IHRoZSBlbnRyeSBwb2ludCBhbmQgb3V0cHV0IGZpbGUgbmFtZSBiYXNlZCBvbiBhcHBLZXlcbmNvbnN0IGVudHJ5UG9pbnQgPSBgc3JjL2Jvb3N0LSR7YXBwS2V5fS50c2A7XG5jb25zdCBvdXRwdXRGaWxlTmFtZSA9IGBib29zdC0ke2FwcEtleX0ubWpzYDtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICB2dWVKc3goKSxcbiAgICBuaWdodHdhdGNoUGx1Z2luKCksXG4gICAgVnVlRGV2VG9vbHMoKSxcbiAgXSxcbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHtcbiAgICAgIC8vIHNyYy9pbmRleHQudHMgaXMgd2hlcmUgd2UgaGF2ZSBleHBvcnRlZCB0aGUgY29tcG9uZW50KHMpXG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsIGVudHJ5UG9pbnQpLFxuICAgICAgbmFtZTogYXBwS2V5LFxuICAgICAgZm9ybWF0czogWydlcyddLFxuXHRcdFx0ZmlsZU5hbWU6IChmb3JtYXQpID0+IHtcblx0XHRcdFx0c3dpdGNoIChmb3JtYXQpIHtcblx0XHRcdFx0XHRjYXNlICdlcyc6XG5cdFx0XHRcdFx0XHRyZXR1cm4gb3V0cHV0RmlsZU5hbWVcblx0XHRcdFx0fVxuXHRcdFx0fSxcblxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFtcbiAgICAgICAgJ2F4aW9zJyxcbiAgICAgICAgJ3BpbmlhJyxcbiAgICAgICAgJ3Z1ZScsXG4gICAgICBdLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGV4cG9ydHM6ICduYW1lZCcsXG4gICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICB2dWU6ICdWdWUnLFxuICAgICAgICAgIHBpbmlhOiAnUGluaWEnLFxuICAgICAgICAgIGF4aW9zOiAnYXhpb3MnLFxuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFQsU0FBUyxlQUFlLFdBQVc7QUFFL1YsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxzQkFBc0I7QUFDN0IsT0FBTyxpQkFBaUI7QUFSeEIsSUFBTSxtQ0FBbUM7QUFBMkosSUFBTSwyQ0FBMkM7QUFXclAsSUFBTSxjQUFjLEtBQUssTUFBTSxhQUFhLFFBQVEsa0NBQVcsY0FBYyxHQUFHLE9BQU8sQ0FBQztBQUd4RixJQUFNLFNBQVMsWUFBWTtBQUUzQixJQUFNLGFBQWEsYUFBYSxNQUFNO0FBQ3RDLElBQU0saUJBQWlCLFNBQVMsTUFBTTtBQUd0QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxpQkFBaUI7QUFBQSxJQUNqQixZQUFZO0FBQUEsRUFDZDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBO0FBQUEsTUFFSCxPQUFPLFFBQVEsa0NBQVcsVUFBVTtBQUFBLE1BQ3BDLE1BQU07QUFBQSxNQUNOLFNBQVMsQ0FBQyxJQUFJO0FBQUEsTUFDakIsVUFBVSxDQUFDLFdBQVc7QUFDckIsZ0JBQVEsUUFBUTtBQUFBLFVBQ2YsS0FBSztBQUNKLG1CQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0Q7QUFBQSxJQUVDO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ04sU0FBUztBQUFBLFFBQ1QsU0FBUztBQUFBLFVBQ1AsS0FBSztBQUFBLFVBQ0wsT0FBTztBQUFBLFVBQ1AsT0FBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBRUY7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
