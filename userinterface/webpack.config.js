const nodeExternals = require('webpack-node-externals');

const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify')
    }
  }
};