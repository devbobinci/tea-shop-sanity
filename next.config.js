/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,

  images: {
    domains: ["cdn.sanity.io"],
  },
};

module.exports = nextConfig;
