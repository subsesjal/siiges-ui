const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  '@siiges-ui/shared',
  '@siiges-ui/authentication',
]);

module.exports = withPlugins([withTM()], {
  webpack: (config) => config,
  images: {},
});
