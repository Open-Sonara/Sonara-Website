import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // app.js is the CommonJS startup file for Plesk/Passenger.
  { files: ["app.js"], languageOptions: { sourceType: "commonjs" }, rules: { "@typescript-eslint/no-require-imports": "off" } },
  globalIgnores([".impeccable/**", ".next/**", "out/**", "build/**", "coverage/**", "playwright-report/**", "test-results/**", "next-env.d.ts"]),
]);

export default eslintConfig;
