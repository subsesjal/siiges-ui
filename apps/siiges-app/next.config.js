const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  '@siiges-ui/authentication',
  '@siiges-ui/inspecciones',
  '@siiges-ui/instituciones',
  '@siiges-ui/notificaciones',
  '@siiges-ui/opds',
  '@siiges-ui/revalidaciones',
  '@siiges-ui/serviciosescolares',
  '@siiges-ui/shared',
  '@siiges-ui/solicitudes',
  '@siiges-ui/users',
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
  staticPageGenerationTimeout: 900, // Aumentar de 60s a 900s (15 minutos)
});
