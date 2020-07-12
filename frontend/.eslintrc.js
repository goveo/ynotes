module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint",
    "react",
    "react-hooks",
  ],
  "globals": {
    "localStorage": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "react/jsx-uses-vars": ["error"],
    "@typescript-eslint/no-var-requires": "off",
    "no-trailing-spaces": ["error"],
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "semi": ["error", "always"],
    "comma-dangle": ["error", "always-multiline"],
    "brace-style": ["error", "stroustrup"],
    "comma-spacing": ["error"], //пробелы после запятой
    "array-bracket-spacing": ["error"], //пробелы перед ифом
    "keyword-spacing": ["error"], //пробелы после ":"в объектах
    "key-spacing": ["error"], //пробелы после ":"в объектах
    "eol-last": ["error"],
    "quotes": [2, "single", "avoid-escape"],
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "switch-colon-spacing": ["error", {"after": true, "before": false}],
    "react-hooks/rules-of-hooks": 'error',
    "react-hooks/exhaustive-deps": 'warn'
  }
};