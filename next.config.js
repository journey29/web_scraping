/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "m.media-amazon.com",
      "images.prom.ua",
      "ireland.apollo.olxcdn.com",
    ],
  },
};

module.exports = nextConfig;
