import js from "@eslint/js"
import tseslint from "typescript-eslint"
import nextPlugin from "@next/eslint-plugin-next"

export default [
  {
    ignores: ["**/node_modules/**", "**/.next/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
]
