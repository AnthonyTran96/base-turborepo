import { nextJsConfig } from "@repo/eslint-config/next-js";
import path from "path";
import tseslint from "typescript-eslint";

/** @type {import("eslint").Linter.Config} */
export default [
  ...nextJsConfig,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: [path.join(process.cwd(), "tsconfig.json")],
        tsconfigRootDir: process.cwd(),
      },
    },
  },
];
