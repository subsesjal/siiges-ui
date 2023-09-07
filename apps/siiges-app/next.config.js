const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  '@siiges-ui/shared',
  '@siiges-ui/authentication',
  '@siiges-ui/inspecciones',
  '@siiges-ui/users',
  '@siiges-ui/instituciones',
  '@siiges-ui/solicitudes',
  '@siiges-ui/serviciosescolares',
]);

module.exports = withPlugins([withTM()], {
  webpack: (config) => config,
  images: {},
});
