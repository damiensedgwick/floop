/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    instrumentationHook: true,
  },
};

module.exports = nextConfig;
