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
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  rules: {
    'no-undef': 0,
    'no-unused-vars': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    // change this to 1 after migration is done
    'emotion/syntax-preference': [0, 'object'],
  },
}
