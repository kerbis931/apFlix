#!/bin/bash

# Navigate to the project directory
cd appFlix

# Pull the latest code
git pull origin main

# Install dependencies
npm install

# Build the application
npm run build

# Restart the application with PM2
pm2 restart appFlix

echo "Deployment completed successfully."
