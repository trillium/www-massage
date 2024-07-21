/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    swcMinify: true,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })
    return config
  },
}