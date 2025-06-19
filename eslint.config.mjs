// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // ✅ Core ESLint + TypeScript support via Next.js presets
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // ✅ Custom rule overrides
  {
    rules: {
      // Allow expressions like `x && doSomething` temporarily
      "@typescript-eslint/no-unused-expressions": "off",

      // Downgrade aliasing of `this` to a warning
      "@typescript-eslint/no-this-alias": "warn",

      // Allow unused variables/args if prefixed with _
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      // Downgrade require() usage so it doesn't block you
      "@typescript-eslint/no-require-imports": "warn",
    },
  },
];

export default eslintConfig;