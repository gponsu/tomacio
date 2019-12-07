const withSourceMaps = require('@zeit/next-source-maps');
const withOffline = require('next-offline');
const path = require("path");

require('dotenv').config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`)
});

const nextConfig = {
  webpack(config, options) {
    if (!options.isServer)
      config.resolve.alias['@sentry/node'] = '@sentry/browser';

    return config;
  },
  workboxOpts: {
    importScripts: ['notifications.js']
  },
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    SENTRY_DSN: process.env.SENTRY_DSN
  }
}

module.exports = withSourceMaps(withOffline(nextConfig));
