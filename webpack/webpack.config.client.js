const { join, resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanCSS = require('clean-css');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Imagemin = require('imagemin-webpack-plugin').default;
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = (webpackEnv, { mode }) => {
  const env = dotenv.config().parsed;

  return {
    entry: {
      app: './src/client/index.js',
    },
    output: {
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].js',
      path: join(__dirname, '../dist/client'),
      publicPath: '/',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@client': resolve(__dirname, '../src/client'),
      },
    },
    devtool: mode === 'production' ? '' : 'source-map',
    devServer: {
      compress: true,
      hot: true,
      historyApiFallback: true,
      open: true,
      port: env.CLIENT_PORT,
      quiet: true,
      overlay: {
        warnings: false,
        errors: true,
      },
    },
    optimization: {
      splitChunks: {
        name: (_, chunks) => `${chunks
          .map((item) => item.name)
          .sort()
          .join('~')}`,
        cacheGroups: {
          libs: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            name: 'libs',
            enforce: true,
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            mode === 'production'
              ? {
                loader: MiniCssExtractPlugin.loader,
                options: { publicPath: '../' },
              }
              : { loader: 'style-loader' },
            { loader: 'css-loader', options: { sourceMap: true } },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                ident: 'postcss',
              },
            },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        },
        {
          test: /\.css$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            mode === 'production'
              ? {
                loader: MiniCssExtractPlugin.loader,
                options: { publicPath: '../' },
              }
              : { loader: 'style-loader' },
            { loader: 'css-loader', options: { sourceMap: true } },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                ident: 'postcss',
              },
            },
          ],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          enforce: 'pre',
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'eslint-loader',
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '[name].[ext]',
            outputPath: 'img/',
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),
        'process.env.BASE_URL': JSON.stringify(env.BASE_URL),
        'process.env.SERVER_URL': JSON.stringify(env.SERVER_URL),
      }),
      new CleanWebpackPlugin(),
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here http://localhost:${env.CLIENT_PORT}`],
        },
        clearConsole: true,
      }),
      new HTMLWebpackPlugin({
        template: './public/index.html',
        filename: './index.html',
        minify: {
          minifyCSS: true,
          minifyJS: true,
          sortAttributes: true,
          sortClassName: true,
          collapseWhitespace: true,
          conservativeCollapse: false,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          removeAttributeQuotes: false,
        },
      }),
      new PreloadWebpackPlugin({
        rel: 'preload',
        include: {
          type: 'initial',
          entries: ['libs', 'app'],
        },
      }),
      new PreloadWebpackPlugin({
        rel: 'prefetch',
      }),
      new StylelintPlugin({
        configFile: './stylelint.config.js',
        fix: true,
        files: '**/*.(scss|css)',
      }),
      new MiniCssExtractPlugin({
        filename: 'css/app.css',
        chunkFilename: 'css/[name].css',
        ignoreOrder: true,
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: CleanCSS,
        cssProcessorOptions: { level: 2, rebase: false },
        canPrint: true,
      }),
      new CopyPlugin({
        patterns: [
          // {
          //   from: './public/favicon.png',
          //   to: 'favicon.png',
          // },
          {
            from: './public/manifest.json',
            to: 'manifest.json',
          },
        ],
      }),
      new Imagemin({ test: /\.(jpe?g|png|gif|svg})$/i }),
    ],
  };
};
