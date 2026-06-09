const NEXT_PUBLIC_ENV = {
  NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  NEXT_PUBLIC_SHOW_CREAR_SOLICITUD: process.env.NEXT_PUBLIC_SHOW_CREAR_SOLICITUD,
  NEXT_PUBLIC_USERS_VERSION: process.env.NEXT_PUBLIC_USERS_VERSION,
};

export default function getEnvironmentVar(key, defaultValue = null) {
  if (!key) {
    return defaultValue;
  }

  if (Object.prototype.hasOwnProperty.call(NEXT_PUBLIC_ENV, key)) {
    return NEXT_PUBLIC_ENV[key] !== undefined ? NEXT_PUBLIC_ENV[key] : defaultValue;
  }

  const value = process.env[key];

  return value !== undefined ? value : defaultValue;
}
