describe('env config', () => {
  const originalUsersVersion = process.env.NEXT_PUBLIC_USERS_VERSION;

  afterEach(() => {
    if (originalUsersVersion === undefined) {
      delete process.env.NEXT_PUBLIC_USERS_VERSION;
    } else {
      process.env.NEXT_PUBLIC_USERS_VERSION = originalUsersVersion;
    }
    jest.resetModules();
  });

  it('maps NEXT_PUBLIC_USERS_VERSION into config', async () => {
    process.env.NEXT_PUBLIC_USERS_VERSION = 'test-version';
    jest.resetModules();

    const envModule = await import('../../../lib/config/env');

    expect(envModule.config.usersVersion).toBe('test-version');
    expect(envModule.default.usersVersion).toBe('test-version');
  });
});
