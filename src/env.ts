import { EnvironmentError } from "./error-utils";

// Structure:
// [environmentVariable, default, required?]
const ENV_VARS = {
  DISCORD_API_TOKEN: [
    process.env.DISCORD_API_TOKEN,
    "YOUR_DISCORD_API_TOKEN",
    true,
  ],
  MONGODB_URI: [process.env.MONGODB_URI, "YOUR_MONGODB_URI", true],
  POLLEN_ADMIN: [process.env.POLLEN_ADMIN, "YOUR_POLLEN_ADMIN_IDS_ARRAY", true],
  GUILD_ID: [process.env.GUILD_ID, "YOUR_GUILD_ID", true],
  SENTRY_DSN: [process.env.SENTRY_DSN, "", false],
};

function environment(name: string): string {
  const envVar = ENV_VARS[name];
  if (!envVar) {
    return null;
  }
  // If the environment variable is required and has not been properly set,
  // throw an error.
  if (envVar === ENV_VARS[name][1] && ENV_VARS[name][2]) {
    throw new EnvironmentError(
      `The environment variable with name ${name} has not been set properly. Please edit it on the heroku config vars.`
    );
  }

  return envVar[0] === undefined ? envVar[1] : envVar[0].trim();
}

export default { environment };
