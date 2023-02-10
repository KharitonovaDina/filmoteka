const {merge} = require('webpack-merge');
const WEBPACK_CONFIG = require('./webpack.config.js');

const BUILD_WEBPACK_CONFIG = merge(WEBPACK_CONFIG, {
  mode: 'production',
  devtool: 'source-map',
  plugins: []
});

module.exports = new Promise((resolve, reject) => {
  resolve(BUILD_WEBPACK_CONFIG)
});