module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['react-app', 'prettier'],
  rules: { 'import/no-anonymous-default-export': 0 },
};
