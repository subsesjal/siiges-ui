/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/__tests__/testUtils.js',
    '<rootDir>/packages/*/__tests__/testUtils.js',
  ],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: [
    'text-summary',
    'lcov',
  ],
  // The paths to modules that run some code to configure or set up the
  // testing environment before each test
  setupFiles: [
    '<rootDir>/packages/shared/__tests__/setupTest.jsx',
    '<rootDir>/packages/authentication/__tests__/setupTest.jsx',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/packages/shared/__tests__/jest-setupTest.js',
    '<rootDir>/packages/authentication/__tests__/jest-setupTest.js',
  ],
  // The glob patterns Jest uses to detect test files
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
  ],
  // Set default test environment to jsdom
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  // Indicates whether each individual test should be reported during the run
  verbose: true,
};
