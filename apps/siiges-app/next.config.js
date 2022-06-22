const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  '@booking-ui/shared',
  '@booking-ui/authentication',
]);
module.exports = withPlugins([withTM()], {
  webpack: (config) => {
    // custom webpack config
    return config;
  },
  images: {},
});