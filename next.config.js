const getCustomVariables = () => {
  const processEnvVariables = { ...process.env }
  // Return a new object with the properties that has PROJECT_KEY_ prefix
  const projectEnvVariables = Object.keys(processEnvVariables)
    .filter(key => key.includes('PROJECT_KEY_'))
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
