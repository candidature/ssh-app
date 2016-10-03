'use strict';
const Webpack = require('webpack');
const Path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const buildDir = Path.resolve(__dirname, '../dist');

const styles = [
  Path.resolve(__dirname, '../src/styles.scss')
];
const scripts = [];

const entry = {
  main: Path.resolve(__dirname, '../src/main'),
  styles: styles
};
const envs = {
  source: '../src/environment.ts',
  prod: '../src/environment.prod.ts',
  production: '../src/environment.prod.ts'     
};
const config = {
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js']
  },
  context: buildDir,
  entry: entry,
  output: {
    path: buildDir,
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map',
        exclude: [/node_modules/]
      },
      // in main, load css as raw text
      {
        exclude: styles,
        test: /\.scss$|\.sass$/,
        loaders: ['raw', 'postcss', 'sass']
      },

      // outside of main, load it via style-loader
      {
        include: styles,
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss']
      }, {
        include: styles,
        test: /\.scss$|\.sass$/,
        loaders: ['style', 'css', 'postcss', 'sass']
      },

      // load global scripts using script-loader
      { include: scripts, test: /\.js$/, loader: 'script' },

      { test: /\.json$/, loader: 'json' },
      { test: /\.(jpg|png|gif)$/, loader: 'url?limit=10000' },
      { test: /\.html$/, loader: 'html' },

      { test: /\.(otf|woff|ttf|svg)$/, loader: 'url?limit=10000' },
      { test: /\.woff2$/, loader: 'url?limit=10000&mimetype=font/woff2' },
      { test: /\.eot$/, loader: 'file' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../src/index.html'),
      chunkSortMode: 'dependency'
    }),
    new Webpack.NormalModuleReplacementPlugin(
      // This plugin is responsible for swapping the environment files.
      // Since it takes a RegExp as first parameter, we need to escape the path.
      // See https://webpack.github.io/docs/list-of-plugins.html#normalmodulereplacementplugin
      new RegExp(Path.resolve(__dirname, envs['source'])
        .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')),
      Path.resolve(__dirname, envs[process.env.NODE_ENV] || envs['source'])
    ),
    new Webpack.optimize.CommonsChunkPlugin({
      name: ['styles', 'scripts', 'main'].reverse()
    }),
    new Webpack.optimize.CommonsChunkPlugin({
      minChunks: Infinity,
      name: 'inline',
      filename: 'inline.js',
      sourceMapFilename: 'inline.map'
    }),
    new CopyWebpackPlugin([{
      context: Path.resolve(__dirname, '../src/assets'),
      from: { glob: '**/*', dot: true },
      ignore: ['.gitkeep'],
      to: Path.resolve(__dirname, '../dist/assets')
    }])
  ],
  node: {
    fs: 'empty',
    global: true,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
  target: 'electron'
};

module.exports = config;