const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var config = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    darkjs: './src/dark/index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Darkjs',
      favicon: './src/assets/bat.svg',
      chunks: ['index'],
      scriptLoading: 'blocking',
    }),
    new WebpackManifestPlugin({
      publicPath: '',
    }),
    new MiniCssExtractPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  }
  if (argv.mode === 'production') {
    
  }
  return config;
};