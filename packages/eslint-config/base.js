import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginTailwindcss from 'eslint-plugin-tailwindcss';
import pluginTurbo from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: pluginTurbo,
      tailwindcss: pluginTailwindcss,
      prettier: pluginPrettier
    },
    settings: {
      tailwindcss: {
        callees: ['clsx', 'classnames']
      }
    },
    ignores: ['dist/**', 'build/**', '.next/**', 'node_modules/**', '.turbo/**', 'coverage/**'],
    rules: {
      // ⚙️ TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-empty-object-type': 'off',

      // ⚙️ Turbo monorepo rules
      'turbo/no-undeclared-env-vars': 'warn',

      // ⚙️ TailwindCSS rules
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': 'off',

      // ⚙️ Common JS/TS rules
      'no-console': 'warn',
      'no-debugger': 'warn',

      // ⚙️ Prettier rule — để ESLint check định dạng theo .prettierrc
      'prettier/prettier': [
        'warn',
        {
          bracketSpacing: true,
          printWidth: 100,
          singleQuote: true,
          trailingComma: 'none',
          tabWidth: 2,
          useTabs: false,
          endOfLine: 'auto',
          plugins: ['prettier-plugin-tailwindcss']
        }
      ]
    }
  }
];
