import { config as reactInternal } from "@repo/eslint-config/react-internal";
import path from "path";
import tseslint from "typescript-eslint";

/** @type {import("eslint").Linter.Config} */
export default [
  ...reactInternal,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: [path.join(process.cwd(), "tsconfig.json")],
        tsconfigRootDir: process.cwd(),
      },
    },
  },
  {
    rules: {
      "react/prop-types": "off", 
      "react/no-danger": "warn", 
      "@typescript-eslint/consistent-type-imports": "warn",
    },
  },
];
