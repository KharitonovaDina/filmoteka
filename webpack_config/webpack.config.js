const PATH = require('path');
const FS = require('fs');

const MINI_CSS_EXTRACT_PLUGIN = require('mini-css-extract-plugin');
const COPY_WEBPACK_PLUGIN = require('copy-webpack-plugin');
const HTML_WEBPACK_PLUGIN = require('html-webpack-plugin');
const SPRITE_LOADER_PLUGIN = require('svg-sprite-loader/plugin');
const ESLINT_PLUGIN = require('eslint-webpack-plugin');

const PATHS = {
  src: PATH.join(__dirname, '../src'),
  dist: PATH.join(__dirname, '../dist'),
  assets: 'assets/'
};

const DEV_MODE = process.env.NODE_ENV === 'development';

const PAGES_DIR = `${PATHS.src}/pages/`;
const PAGES = FS.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

module.exports = {
  externals: {
    paths: PATHS
  },

  entry: {
    app: PATHS.src,
  },

  output: {
    filename: `${PATHS.assets}js/[name].[hash].js`,
    path: PATHS.dist,
    publicPath: '/',
    clean: true // Очистка директории path при новой сборке
  },

  optimization: {
    minimize: true, // Минификация js
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.pug$/i,
        use: [
          {
            loader: 'pug-loader?pretty=true'
          }
        ]
      },

      {
        test: /\.(css|scss)$/i,
        use: [
          DEV_MODE ? 'style-loader' : MINI_CSS_EXTRACT_PLUGIN.loader,
          {
            loader: 'css-loader',
            options: {
              url: true, // Если true, то по url указанным в css
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                outputStyle: 'expanded' // Отключение минификации SASS-loader в пользу PostCSS
              }
            }
          }
        ]
      },

      {
        test: /\.js$/i,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },

      {
        test: /_\w+.svg$/i, // Сборка спрайта
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              publicPath: 'assets/img/'
            }
          },
          'svgo-loader'
        ]
      },

      {
        test: /img-\w+.svg$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name][ext][query]'
        }
      },

      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name][ext][query]'
        }
      },

      {
        test: /tmp-\d+.(svg|png|jpg|jpeg|gif)$/i, // Для контентных изображений
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/tmp/[name][ext][query]'
        }
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext][query]'
        }
      }
    ]
  },

  plugins: [
    new ESLINT_PLUGIN(),

    new SPRITE_LOADER_PLUGIN(),

    new MINI_CSS_EXTRACT_PLUGIN({
      filename: `${PATHS.assets}css/[name].[hash].css`
    }),

    new COPY_WEBPACK_PLUGIN({
      patterns: [
        {
          from: `${PATHS.src}/static`,
          to: '',
          noErrorOnMissing: true
        }
      ]
    }),

    ...PAGES.map(page => new HTML_WEBPACK_PLUGIN({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug/, '.html')}`,
      minify: false // Минификация html
    }))
  ]
};