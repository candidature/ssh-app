const Path = require('path');
const Webpack = require('webpack');
const { NgcWebpackPlugin } = require('@ngtools/webpack');
const webpackMerge = require('webpack-merge');

const tsConfig = Path.resolve(__dirname, '../src/tsconfig.json');

const prodConfig = {
  devtool: 'eval',
  output: {
    path: Path.resolve(__dirname, '../build'),
    filename: '[name].[chunkhash].bundle.js',
    sourceMapFilename: '[name].[chunkhash].bundle.map',
    chunkFilename: '[id].[chunkhash].chunk.js'
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
    new NgcWebpackPlugin({
      project: tsConfig,
      baseDir: Path.resolve(__dirname, '..'),
      entryModule: Path.join(__dirname, '../src', 'app/app.module#AppModule'),
      genDir: Path.resolve(__dirname, '../tmp', 'ngFactory')
    }),
    new Webpack.optimize.UglifyJsPlugin({
      mangle: { screw_ie8: true },
      compress: { screw_ie8: true },
      comments: false,
      sourceMap: true
    })
  ]
};

module.exports = webpackMerge(require('./webpack.common'), prodConfig);
