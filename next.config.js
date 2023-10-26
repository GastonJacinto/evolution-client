/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'www.cimformacion.com'],
  },
};

module.exports = nextConfig;
