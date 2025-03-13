import configPrettier from "eslint-config-prettier";
import eslintPluginImport from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import tsParser from "@typescript-eslint/parser";
import tseslint from "@typescript-eslint/eslint-plugin";

export default [
  {
    ignores: ["node_modules", "dist", ".vite"],
  },
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      sourceType: "module",
    },
    plugins: {
      import: eslintPluginImport,
      "@typescript-eslint": tseslint,
      prettier,
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          "endOfLine": "auto"
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"]
          ],
          "newlines-between": "always"
        }
      ],
    },
  },
  configPrettier,
];
