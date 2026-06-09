import { dotenv } from '@siiges-ui/shared';

const config = {
  usersVersion: dotenv.getEnvironmentVar('NEXT_PUBLIC_USERS_VERSION', 'v1'),
};

export { config };

export default config;
