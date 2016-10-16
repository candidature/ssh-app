const Path = require('path');
const Webpack = require('webpack');
const { AotPlugin } = require('@ngtools/webpack');
const webpackMerge = require('webpack-merge');

const tsConfig = Path.resolve(__dirname, '../src/tsconfig.json');

const prodConfig = {
  output: {
    path: Path.resolve(__dirname, '../app/dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.map',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: '@ngtools/webpack',
        exclude: [/\.(spec|e2e)\.ts$/]
      }
    ]
  },
  plugins: [
    new AotPlugin({
      tsConfigPath: tsConfig,
      mainPath: Path.join(__dirname, '../src/main.ts')
    }),
    new Webpack.optimize.UglifyJsPlugin({
      mangle: { screw_ie8: true },
      compress: { screw_ie8: true, warnings: false },
      comments: false,
      sourceMap: true
    })
  ]
};

module.exports = webpackMerge(require('./webpack.common'), prodConfig);
