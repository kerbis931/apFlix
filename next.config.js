require('dotenv').config();

const nextConfig = {
  reactStrictMode: true,
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OMDB_API_KEY: process.env.OMDB_API_KEY,
    MONGODB_URI: process.env.MONGODB_URI // Ensure this is added
  },
  images: {
    domains: ['m.media-amazon.com']
  }
};

module.exports = nextConfig;
