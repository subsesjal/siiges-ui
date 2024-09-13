const path = require('path');

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-shadow': 'off',
    'no-return-assign': 'off',
    'linebreak-style': 0,
    'import/no-extraneous-dependencies': process.env.NODE_ENV === 'production' ? 'off' : [
      'error',
      {
        packageDir: [
          __dirname,
          path.join(__dirname, 'packages/authentication'),
          path.join(__dirname, 'packages/inspecciones'),
          path.join(__dirname, 'packages/instituciones'),
          path.join(__dirname, 'packages/serviciosescolares'),
          path.join(__dirname, 'packages/shared'),
          path.join(__dirname, 'packages/solicitudes'),
          path.join(__dirname, 'packages/users'),
          path.join(__dirname, 'apps/siiges-app'),
        ],
      },
    ],
  },
};
