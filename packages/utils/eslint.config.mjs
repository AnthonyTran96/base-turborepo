import { config as baseConfig } from '@repo/eslint-config/base';

import path from 'path';

/** @type {import("eslint").Linter.Config} */
export default [
  ...baseConfig,
  {
    languageOptions: {
      parserOptions: {
        project: [path.join(process.cwd(), 'tsconfig.json')],
        tsconfigRootDir: process.cwd()
      }
    }
  }
];
