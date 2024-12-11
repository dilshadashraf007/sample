// webpack.config.js
const express = require('express');

module.export = {
  // Other configuration options
  devServer: {
    // Use setupMiddleware instead of onAfterSetupMiddleware
    setupMiddleware: function (devServer) {
      // Add any middleware setup code here
      devServer.app.use('/api', express.json(), (req, res) => {
        res.json({ message: 'Hello from Webpack middleware!' });
      });
    },
    // Other devServer settings
  },
};
