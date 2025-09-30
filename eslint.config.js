import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig } from "eslint/config";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default defineConfig([
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  { ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"] },
]);
