import dotenv, {
  getConfigPath,
  getEnvironmentVar,
  setEnvironmentVar,
} from '../../src/utils/dotenv';

describe('dotenv utility', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.DOTENV_CONFIG_PATH;
    delete process.env.NODE_ENV;
    delete process.env.TEST_KEY;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test('getEnvironmentVar returns value when it exists', () => {
    process.env.TEST_KEY = 'present';

    expect(getEnvironmentVar('TEST_KEY')).toBe('present');
  });

  test('getEnvironmentVar returns defaultValue when variable is missing', () => {
    expect(getEnvironmentVar('TEST_KEY', 'fallback')).toBe('fallback');
  });

  test('getEnvironmentVar returns null when variable is missing and no defaultValue is sent', () => {
    expect(getEnvironmentVar('TEST_KEY')).toBe(null);
  });

  test('setEnvironmentVar writes and returns the assigned value', () => {
    const value = setEnvironmentVar('TEST_KEY', 'new-value');

    expect(value).toBe('new-value');
    expect(process.env.TEST_KEY).toBe('new-value');
  });

  test('getConfigPath returns DOTENV_CONFIG_PATH when defined', () => {
    process.env.DOTENV_CONFIG_PATH = '.env.custom';

    expect(getConfigPath()).toBe('.env.custom');
  });

  test('getConfigPath resolves by runtime when no override is provided', () => {
    expect(getConfigPath('test')).toBe('.env.test');
    expect(getConfigPath('production')).toBe('.env.production');
    expect(getConfigPath('development')).toBe('.env.local');
    expect(getConfigPath('staging')).toBe('.env');
  });

  test('default export exposes the 3 public methods', () => {
    expect(dotenv).toEqual({
      getConfigPath,
      getEnvironmentVar,
      setEnvironmentVar,
    });
  });
});
