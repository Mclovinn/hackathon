const getCustomVariables = () => {
  const processEnvVariables = { ...process.env }
  // Return a new object with the properties that has LOGISTICS_ prefix
  const projectEnvVariables = Object.keys(processEnvVariables)
    .filter(key => key.includes('LOGISTICS_'))
    .reduce((obj, key) => ({ ...obj, [key]: processEnvVariables[key] }), {})
  return projectEnvVariables
}

module.exports = {
  env: getCustomVariables(),
}
