module.exports = {
  singleQuote: true,
  printWidth: 120,
  trailingComma: 'es5',
  tabWidth: 2,
  semi: false,
  arrowParens: 'avoid',
  endOfLine: 'auto',
  overrides: [
    {
      files: '*.json',
      options: {
        singleQuote: false
      }
    },
    {
      files: '.*rc',
      options: {
        singleQuote: false,
        parser: 'json'
      }
    }
  ]
}
