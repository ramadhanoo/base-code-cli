import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      react: react,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      globals: {
        module: 'readonly',  // Menandakan bahwa 'module' adalah global yang hanya bisa dibaca
        require: 'readonly', // Menambahkan require jika perlu
        process: 'readonly', // Menambahkan process jika perlu
        __dirname: 'readonly',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'no-useless-catch': 'warn',
      'no-case-declarations': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
