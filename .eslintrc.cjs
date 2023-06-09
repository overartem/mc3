module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      tsx: true,
      jsx: true,
    },
  },
  plugins: ["react-refresh", "react", "react-hooks"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
