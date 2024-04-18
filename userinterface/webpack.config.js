const nodeExternals = require('webpack-node-externals');

module.exports = {
  // Your Webpack configuration goes here
  externals: [
    nodeExternals({
      // Allowlist specific modules that should be bundled
      allowlist: ['crypto']
    })
  ]
};
