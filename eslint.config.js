import globals from 'globals';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
  {
    ...js.configs.recommended,
    files: ['**/*.js'],
    plugins: { prettier: eslintPluginPrettier },
    rules: {
      ...eslintPluginPrettier.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
      'class-methods-use-this': 'off',
      'comma-dangle': 'off',
      'object-curly-newline': 'off',
      'operator-linebreak': 'before',
      'implicit-arrow-linebreak': 'off',
      'function-paren-newline': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/extensions': 'off',
      'import/no-absolute-path': 'off',
      'generator-star-spacing': 'off',
      'no-prototype-builtins': 'off',
      'no-underscore-dangle': 'off',
      'no-plusplus': 'off',
      'no-undef': 'warn',
      'no-case-declarations': 'warn',
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        myCustomGlobal: 'readonly',
      },
    },
  },
];
