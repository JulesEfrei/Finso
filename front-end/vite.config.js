import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import { fileURLToPath, URL } from "url";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
  test: {
    exclude: [...configDefaults.exclude, "**/e2e/**"],
  },
});
