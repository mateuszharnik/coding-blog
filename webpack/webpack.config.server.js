const { join, resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    index: './src/server/index.js',
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: join(__dirname, '../dist/server'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@server': resolve(__dirname, '../src/server'),
    },
  },
  target: 'node',
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
  devtool: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint-loader',
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
