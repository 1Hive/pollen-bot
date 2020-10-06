const { EnvironmentError } = require('./error-utils')

// Structure:
// [environmentVariable, default, required?]
const ENV_VARS = {
  DISCORD_API_TOKEN: [
    process.env.DISCORD_API_TOKEN,
    'YOUR_DISCORD_API_TOKEN',
    true,
  ],
  WEB3_URL: [
    process.env.WEB3_URL,
    'YOUR_WEB3_URL',
    true,
  ],
  MONGODB_URI: [
    process.env.MONGODB_URI,
    'YOUR_MONGODB_URI',
    true,
  ],
  DB_NAME: [
    process.env.DB_NAME,
    'YOUR_DB_NAME',
    true,
  ],
  COLL_NAME: [
    process.env.COLL_NAME,
    'YOUR_COLL_NAME',
    true,
  ],
  SENTRY_DSN: [process.env.SENTRY_DSN, '', false],
}

function environment(name) {
  const envVar = ENV_VARS[name]
  if (!envVar) {
    return null
  }
  // If the environment variable is required and has not been properly set,
  // throw an error.
  if (envVar === ENV_VARS[name][1] && ENV_VARS[name][2]) {
    throw new EnvironmentError(
      `The environment variable with name ${name} has not been set properly. Please edit it on the heroku config vars.`,
    )
  }

  return envVar[0] === undefined ? envVar[1] : envVar[0].trim()
}

module.exports = { environment }
