//
// .eslint.config.js
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';

// Exporterar ESLint-konfigurationen
export default [
  {
    files: ['**/*.ts', '**/*.tsx'], // Gäller för TypeScript-filer
    languageOptions: {
      parser: typescriptEslintParser, // Använd TypeScript ESLint-parser
      parserOptions: {
        project: './tsconfig.json', // Se till att denna väg är korrekt och pekar på din tsconfig
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      react: eslintPluginReact,
      prettier: eslintPluginPrettier,
    },
    rules: {
      // Integrerar Prettier med ESLint, felar om Prettier-regler bryts
      'prettier/prettier': 'error',
      // Lägg till andra ESLint-specifika regler här
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
    },
    settings: {
      react: {
        version: 'detect', // Automatiskt upptäcka React-version
      },
    },
  },
];
