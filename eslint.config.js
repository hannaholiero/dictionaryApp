import globals from "globals";
import jsPlugin from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import prettierPlugin from "eslint-plugin-prettier"; // För att integrera Prettier i ESLint

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ignores: [
      "vite.config.ts",
      "postcss.config.js",
      "eslint.config.js",
      ".dependency-cruiser.cjs",
      "tests/setup.js",
      "src/styles/tailwind.config.js",
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
        ...globals.jest, // Om du använder Jest för tester
      },
    },
  },
  {
    plugins: {
      js: jsPlugin,
    },
    rules: {
      ...jsPlugin.configs.recommended.rules,
    },
  },
  {
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
  {
    plugins: {
      react: reactPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off", // Ignorera React-importering i moderna projekt
      "react/prop-types": "off", // Ignorera prop-types i TS-projekt
    },
  },
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      "prettier/prettier": "error", // Hanterar Prettier-regler som ESLint-fel
    },
  },
];
