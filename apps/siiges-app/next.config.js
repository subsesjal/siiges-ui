/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
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
  ],
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
