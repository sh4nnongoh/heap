module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  ignorePatterns: ['dist', 'node_modules', 'docs', 'vite.config.ts'],
  rules: {
    "import/extensions": [0],
  },
};
