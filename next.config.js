/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'www.cimformacion.com'],
  },
  pages: {
    signOut: '/', // Redirige a esta página después del cierre de sesión
  },
};

module.exports = nextConfig;
