module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'emotion'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'no-undef': 0,
    'no-unused-vars': 0,
    '@typescript-eslint/member-delimiter-style': [
      2,
      {
        multiline: { delimiter: 'comma', requireLast: false },
        singleline: { delimiter: 'comma', requireLast: false },
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 0,
    'emotion/syntax-preference': [1, 'object'],
  },
}
