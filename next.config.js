/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: true,
  compiler: {
    emotion: true,
  },
}

module.exports = nextConfig
