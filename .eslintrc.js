module.exports = {
  extends: ['react-app', 'prettier'],
  rules: {
    semi: ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    quotes: ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-double'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'jsx-a11y/anchor-is-valid': 'off',
  },
  plugins: ['prettier'],
}
