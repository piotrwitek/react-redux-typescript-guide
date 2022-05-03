module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['react-app', 'react-app/jest', 'prettier'],
  rules: { 'import/no-anonymous-default-export': 0 },
};
