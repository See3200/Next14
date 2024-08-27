module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: "latest", // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  extends: [
    "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    // shadcn
    // "next/core-web-vitals",
    // "turbo",
    // "prettier",
    //"plugin:tailwindcss/recommended",
  ],
  rules: {
    "lines-between-class-members": "off",
    "lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
    "max-lines-per-function": ["error", 100],
    "@typescript-eslint/no-explicit-any": "off",
    "react/react-in-jsx-scope": "off",
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
  overrides: [
    {
      files: ["@/shared/ui/*.tsx"],
      rules: {
        "react/prop-types": "off",
        //"react-refresh/only-export-components": "off",
      },
    },
  ],
};
