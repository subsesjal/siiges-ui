/** @type {import('next').NextConfig} */
<<<<<<< HEAD
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
=======
const  withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  '@siiges-ui/shared',
  '@siiges-ui/authentication',
]);

module.exports =  withPlugins([withTM()], {
  webpack: (config) => {
    return config;
  },
  images: {},
});
>>>>>>> abf1603 (feat(login): added the login in separate components)
