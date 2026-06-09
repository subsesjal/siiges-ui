export default function setEnvironmentVar(key, value) {
  if (!key) {
    return null;
  }

  process.env[key] = value;
  return process.env[key];
}
