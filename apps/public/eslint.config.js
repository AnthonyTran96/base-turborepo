import { nextJsConfig } from '@repo/eslint-config/next-js';
import path from 'path';

/** @type {import("eslint").Linter.Config} */
export default [
  ...nextJsConfig,
  {
    languageOptions: {
      parserOptions: {
        project: [path.join(process.cwd(), 'tsconfig.json')],
        tsconfigRootDir: process.cwd()
      }
    }
  }
];
