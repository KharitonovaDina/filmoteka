const {merge} = require('webpack-merge');
const WEBPACK_CONFIG = require('./webpack.config.js');

const DEV_WEBPACK_CONFIG = merge(WEBPACK_CONFIG, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: WEBPACK_CONFIG.externals.paths.dist
    },
    port: 8081,
    open: true,
    hot: false,
    client: {
      overlay: {
        errors: true,
        warnings: true
      }
    }
  },
});

module.exports = new Promise((resolve, reject) => {
  resolve(DEV_WEBPACK_CONFIG)
});