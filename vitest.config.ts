/// <reference types="vitest" />

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    exclude: ["e2e/**", "node_modules/**"],
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setupTests.ts",
  },
});
