module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
    },
  },
  plugins: [
    'html'
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  rules: {
    'space-before-function-paren': ['error', { anonymous: 'never', named: 'never', asyncArrow: 'always' }], // функции с пробелами перед скобками - дичь.
    'no-trailing-spaces': ['error'],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'brace-style': ['error', 'stroustrup'],
    'comma-spacing': ["error"], //пробелы после запятой
    'array-bracket-spacing': ["error"], //пробелы перед ифом
    'keyword-spacing': ["error"], //пробелы после ":"в объектах
    'key-spacing': ["error"], //пробелы после ":"в объектах
    'eol-last': ['error'],

    "react/prop-types": [2, { ignore: ['children', 'history', 'component'] }],
    "quotes": [2, "single", "avoid-escape"],

    'indent': ['error', 2, {
      SwitchCase: 1,
    }],
  },
};
