const ENV_FILE_BY_RUNTIME = {
  test: '.env.test',
  production: '.env.production',
  development: '.env.local',
};

export default function getConfigPath(runtime = process.env.NODE_ENV) {
  if (process.env.DOTENV_CONFIG_PATH) {
    return process.env.DOTENV_CONFIG_PATH;
  }

  return ENV_FILE_BY_RUNTIME[runtime] || '.env';
}
