import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/todo-react/",
  resolve: {
    alias: {
      src: "/src",
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.ts",
    coverage: {
      exclude: [
        ...configDefaults.exclude,
        "**/node_modules/**",
        "**/dist/**",
        "**/coverage/**",
        "**/tests/**",
        "**.cjs",
        "**/src/main.tsx",
        "**/utils/**",
        "**/providers/**",
        "**/index.ts",
      ],
    },
  },
});
