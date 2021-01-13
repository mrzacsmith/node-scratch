const enviroments = {}

enviroments.development = {
  port: 3000,
  envName: 'development',
}

enviroments.production = {
  port: 5000,
  envName: 'production',
}

// normalize enviroment name
const currentEnviroment =
  typeof process.env.NODE_ENV == 'string'
    ? process.env.NODE_ENV.toLowerCase()
    : ''

// set default to development
const enviromentToExport =
  typeof enviroments[currentEnviroment] == 'object'
    ? enviroments[currentEnviroment]
    : enviroments.development

module.exports = enviromentToExport
