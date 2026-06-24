import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "json-summary"],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
      exclude: [
        "node_modules/**",
        ".next/**",
        "out/**",
        "build/**",
        "**/*.config.ts",
        "**/*.config.mjs",
      ],
    },
    include: ["src/**/*.test.{ts,tsx}", "frontend/src/**/*.test.{ts,tsx}"],
  },
});
