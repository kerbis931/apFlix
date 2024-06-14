// next.config.js
const nextConfig = {
  reactStrictMode: true,
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OMDB_API_KEY: process.env.OMDB_API_KEY
  },
  images: {
    domains: ['m.media-amazon.com']
  }
};

module.exports = nextConfig;
