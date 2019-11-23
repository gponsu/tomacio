const withOffline = require('next-offline')

const nextConfig = {
  workboxOpts: {
    importScripts: ['notifications.js']
  }
}

module.exports = withOffline(nextConfig)
