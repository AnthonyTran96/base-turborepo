import { config as baseConfig } from '@repo/eslint-config/base';
import tseslint from 'typescript-eslint';

import path from 'path';

/** @type {import("eslint").Linter.Config} */
export default [
  ...baseConfig,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: [path.join(process.cwd(), 'tsconfig.json')],
        tsconfigRootDir: process.cwd()
      }
    }
  }
];
