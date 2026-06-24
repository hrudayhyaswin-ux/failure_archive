import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "frontend/**",
    "coverage/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "add_details_keys.js",
    "patch_details.js",
    "patch_i18n.js",
  ]),
]);

export default eslintConfig;
