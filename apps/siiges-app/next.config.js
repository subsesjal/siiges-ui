const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  '@siiges-ui/shared',
  '@siiges-ui/authentication',
  '@siiges-ui/inspecciones',
  '@siiges-ui/users',
  '@siiges-ui/instituciones',
  '@siiges-ui/solicitudes',
  '@siiges-ui/serviciosescolares',
  '@siiges-ui/revalidaciones',
  '@siiges-ui/notificaciones',
  '@siiges-ui/opds',
]);

const apiUrl = process.env.NEXT_PUBLIC_URL;
const hostname = apiUrl ? new URL(apiUrl).hostname : '';

module.exports = withPlugins([withTM()], {
  webpack: (config) => config,

  // Aumentar timeout para generación de páginas estáticas (de 60s a 180s)
  staticPageGenerationTimeout: 720,

  images: {
    domains: hostname ? [hostname] : [],
  },
});
