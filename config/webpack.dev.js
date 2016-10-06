const Path = require('path');
const Webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const atl = require('awesome-typescript-loader');
const tsConfig = Path.resolve(__dirname, '../src/tsconfig.json');

const devConfig = {
  devtool: 'eval',
  resolve: {
    plugins: [
      new atl.TsConfigPathsPlugin({
        tsconfig: tsConfig
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [{
          loader: 'awesome-typescript',
          query: {
            useForkChecker: true,
            tsconfig: tsConfig
          }
        }, {
          loader: 'angular2-template'
        }],
        exclude: [/\.(spec|e2e)\.ts$/]
      }
    ]
  },
  plugins: [
    new Webpack.ContextReplacementPlugin(/.*/, Path.resolve(__dirname, '../src')),
    new atl.ForkCheckerPlugin()
  ]
};

module.exports = webpackMerge(require('./webpack.common'), devConfig);
