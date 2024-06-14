module.exports = {
  apps: [
    {
      name: "appFlix",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        OMDB_API_KEY: process.env.OMDB_API_KEY,
        MONGODB_URI: process.env.MONGODB_URI
      }
    }
  ]
};
