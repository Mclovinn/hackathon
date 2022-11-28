module.exports = {
  locales: ['en-US', 'es'],
  catalogs: [
    {
      path: '<rootDir>/locales/{locale}/messages',
      include: ['pages', 'components'],
      exclude: ['node_modules', '.next']
    }
  ],
  format: 'minimal',
  sourceLocale: 'en-US'
}
