/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      // https://lh3.googleusercontent.com/a/AGNmyxY4hvzRIOc_DE4Hhuh6p6UQ9tQ3wa5whPJG8Oz_Dg=s96-c
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      },
    ],
  },
};

module.exports = nextConfig;
