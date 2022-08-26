const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  '@siiges-ui/shared',
  '@siiges-ui/authentication',
  '@siiges-ui/users',
  '@siiges-ui/institutions',
  '@siiges-ui/requests',
]);

module.exports = withPlugins([withTM()], {
  webpack: (config) => config,
  images: {},
});
