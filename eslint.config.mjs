import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/*.d.ts",
      "apps/frontend/public/**",
      "coverage/**",
      "playwright-report/**",
      "test-results/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.browser,
        ...globals.node,
        __GIT_COMMIT_HASH__: "readonly",
        __GIT_BRANCH__: "readonly",
        __GIT_COMMIT_DATE__: "readonly",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    files: ["apps/backend/**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.node,
        Bun: "readonly",
        __GIT_COMMIT_HASH__: "readonly",
        __GIT_BRANCH__: "readonly",
        __GIT_COMMIT_DATE__: "readonly",
      },
    },
  },
);
