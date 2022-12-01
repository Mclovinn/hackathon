const getCustomVariables = () => {
  const processEnvVariables = { ...process.env }
  // Return a new object with the properties that has LOGISTICS_BACKEND_ prefix
  const projectEnvVariables = Object.keys(processEnvVariables)
    .filter(key => key.includes('LOGISTICS_BACKEND_'))
    .reduce((obj, key) => ({ ...obj, [key]: processEnvVariables[key] }), {})
  return projectEnvVariables
}

module.exports = {
  env: getCustomVariables(),
  i18n: {
    locales: ['en-US', 'es'],
    defaultLocale: 'en-US',
    eslint: {
      dirs: ['pages', 'services', 'styles', 'locales', 'config', 'interfaces', 'hooks', 'context', 'components'],
    },
  },
}
